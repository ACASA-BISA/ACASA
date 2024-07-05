import fs from "fs";
import { fromFile } from "geotiff";
import { polygon, booleanPointInPolygon } from "@turf/turf";

async function clipUsingPolygon(
  tiffFilePath,
  polygonCoordinates,
  outputJsonFile
) {
  try {
    // TIFF file using geotiff
    const tiff = await fromFile(tiffFilePath);
    const image = await tiff.getImage();
    const rasters = await image.readRasters();

    // Geotransform
    const tiePoint = image.getTiePoints()[0];
    const pixelScale = image.getFileDirectory().ModelPixelScale;
    const originX = tiePoint.x;
    const originY = tiePoint.y;
    const pixelWidth = pixelScale[0];
    const pixelHeight = -pixelScale[1]; // Assuming negative for north-up images

    // Getting image dimensions
    const width = image.getWidth();
    const height = image.getHeight();

    // Empty array for the mask
    const maskArray = new Uint8Array(width * height).fill(0);

    // Creating turf polygon
    const turfPolygon = polygon([polygonCoordinates]);

    // Filling the mask array based on the polygon
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const geoX = originX + x * pixelWidth;
        const geoY = originY - y * pixelHeight;
        if (booleanPointInPolygon([geoX, geoY], turfPolygon)) {
          maskArray[y * width + x] = 1;
        }
      }
    }

    // Extracting the region using the mask
    const data = rasters[0]; //Single-band image
    const pixels = [];
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const index = y * width + x;
        if (maskArray[index]) {
          pixels.push(data[index]);
        }
      }
    }

    // Preparing JSON object with relevant image information
    const jsonOutput = {
      width,
      height,
      pixels,
    };

    // Writing JSON object to file
    fs.writeFileSync(outputJsonFile, JSON.stringify(jsonOutput, null, 2));

    console.log(`Clipped image data saved to ${outputJsonFile}`);
  } catch (error) {
    console.error("Error processing the TIFF file:", error);
  }
}