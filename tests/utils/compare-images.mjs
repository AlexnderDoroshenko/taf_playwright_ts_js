
/**
 * This script compares two PNG images and generates a visual difference report.
 * It's commonly used in visual regression testing to ensure UI consistency.
 *
 * Required packages:
 * - fs: Node.js built-in file system module
 * - pngjs: For PNG image processing
 * - pixelmatch: For image comparison
 * - fs-extra: Enhanced file system operations
 */

// Import required libraries
import * as fs from 'fs';              // Core Node.js module for file operations
import { PNG } from 'pngjs';           // Library for working with PNG images
import pixelmatch from 'pixelmatch';   // Library for comparing images pixel by pixel
import fsExtra from 'fs-extra';        // Enhanced file system operations library

// Define paths for the images to compare and the output
const baselinePath = 'screenshots/baseline/example.png';  // Path to the reference image
const actualPath = 'screenshots/actual/example.png';      // Path to the image being tested
const diffPath = 'screenshots/diff/example-diff.png';     // Path where the difference image will be saved

// Load both images into memory
// readFileSync reads the entire file synchronously
// PNG.sync.read converts the raw file data into a PNG object
const img1 = PNG.sync.read(fs.readFileSync(baselinePath));
const img2 = PNG.sync.read(fs.readFileSync(actualPath));

// Extract dimensions from the first image
// Both images must have the same dimensions for comparison
const { width, height } = img1;

// Create a new PNG image to store the visual differences
const diff = new PNG({ width, height });

// Ensure the output directory exists before trying to write to it
await fsExtra.ensureDir('screenshots/diff');

// Compare the images pixel by pixel
// Returns the number of pixels that don't match
const mismatchedPixels = pixelmatch(
  img1.data,           // Data from the first image
  img2.data,           // Data from the second image
  diff.data,           // Output image data
  width,               // Image width
  height,              // Image height
  {
    threshold: 0.15,   // How different pixels need to be to be marked as different (0-1)
    includeAA: true,   // Whether to include anti-aliased pixels in the comparison
    alpha: 0.8         // Opacity of the output image
  }
);

// Save the difference image to disk
fs.writeFileSync(diffPath, PNG.sync.write(diff));

// Calculate the percentage of pixels that don't match
const totalPixels = width * height;
const mismatchPercentage = (mismatchedPixels / totalPixels) * 100;

// Output the results
console.log(`Mismatched Pixels: ${mismatchedPixels}`);
console.log(`Mismatch Percentage: ${mismatchPercentage.toFixed(2)}%`);

// Determine if the test passed or failed
// The threshold is set to 0.5% - if more pixels are different, the test fails
if (mismatchPercentage > 0.5) {
  console.error(`Visual test failed: ${mismatchPercentage.toFixed(2)}% > 0.5%`);
  process.exit(1);  // Exit with error code 1 to indicate failure
} else {
  console.log(`Visual test passed.`);  // Test passes if difference is less than 0.5%
}