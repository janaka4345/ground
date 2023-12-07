import getPixels from "get-pixels";
import { max, min } from "lodash";
import { NdArray } from "ndarray";
import { Vector3 } from "three";

// Example, use like:
const makeHeightfieldColliderFromImage = async () => {
  const heightMapTexture = "./Heightmap.png";
  const xSubdivisions = 10;
  const zSubdivisions = 10;
  const yScale = 5;
  const data = await imageToHeightmap(
    heightMapTexture,
    xSubdivisions,
    zSubdivisions,
    yScale
  );

  const scale = 1;
  const nrows = data.numYRows;
  const ncols = data.numXCols;
  const heights = data.tileHeights;
  return new Rapier.Heightfield(nrows, ncols, heights, scale);
};

export const getImageValues = (
  imageURL: string
): Promise<NdArray<Uint8Array>> => {
  return new Promise((resolve, reject) => {
    getPixels(imageURL, (error, pixels) => {
      if (error) {
        return reject(error);
      }
      return resolve(pixels);
    });
  });
};

// example taken from
// https://www.npmjs.com/package/image-to-heightmap
export const imageToHeightmap = async (
  imageURL: string,
  numXCols: number,
  numYRows: number,
  scale: number
) => {
  const pixels = await getImageValues(imageURL);

  const tileHeights = new Array();
  const imageWidth = pixels.shape[0];
  const imageHeight = pixels.shape[1];
  const sizeX = numXCols + 1;
  const sizeY = numYRows + 1;

  // Loop through all of our tile corners, and generate a height for each corner
  // tileHeights[x] = [];
  for (let x = 0; x < sizeX; x++) {
    for (let y = 0; y < sizeY; y++) {
      // Get the corresponding pixel for the current tile corner
      const pixelXPos = Math.ceil((x * (imageWidth - 1)) / numXCols);
      const pixelYPos = Math.ceil((y * (imageHeight - 1)) / numYRows);

      // Get the colors for the given pixel
      const red = pixels.get(pixelXPos, pixelYPos, 0);
      const green = pixels.get(pixelXPos, pixelYPos, 1);
      const blue = pixels.get(pixelXPos, pixelYPos, 2);
      // TODO: Should we calculate alpha for each pixel if we're expecting
      // the same value every time? Should we even expect the same value every time?
      const alpha = pixels.get(pixelXPos, pixelYPos, 3);

      // Note that we divide by `alpha` to get the height
      // If we always use fully opaque images, alpha will be the maximum possible value
      // This allows us to handle 8bit, 16bit, or Nbit images
      // Values are based on ratios. We don't care about the images bit depth
      const heightAtThisPosition = (scale * (red + green + blue)) / 3 / alpha;
      tileHeights.push(heightAtThisPosition);
    }
  }

  return {
    imageWidth,
    imageHeight,
    numXCols,
    numYRows,
    tileHeights,
    max: max(tileHeights),
    min: min(tileHeights),
  };
};

export const genHeightfieldGeometry = (
  nrows: number,
  ncols: number,
  heights: number[],
  scale: Vector3
) => {
  let vertices = new Array();
  let indices = new Array();
  let eltWX = 1.0 / nrows;
  let eltWY = 1.0 / ncols;

  let i, j;
  for (j = 0; j <= ncols; ++j) {
    for (i = 0; i <= nrows; ++i) {
      let x = (j * eltWX - 0.5) * scale.x;
      let y = heights[j * (nrows + 1) + i] * scale.y;
      let z = (i * eltWY - 0.5) * scale.z;
      vertices.push(x, y, z);
    }
  }

  for (j = 0; j < ncols; ++j) {
    for (i = 0; i < nrows; ++i) {
      let i1 = (i + 0) * (ncols + 1) + (j + 0);
      let i2 = (i + 0) * (ncols + 1) + (j + 1);
      let i3 = (i + 1) * (ncols + 1) + (j + 0);
      let i4 = (i + 1) * (ncols + 1) + (j + 1);

      indices.push(i1, i3, i2);
      indices.push(i3, i4, i2);
    }
  }

  return {
    vertices: new Float32Array(vertices),
    indices: new Uint32Array(indices),
  };
};