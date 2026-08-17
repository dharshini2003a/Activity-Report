import fs from "fs";
import path from "path";
import sharp from "sharp";

const publicDir = path.join(process.cwd(), "public");

const supportedExtensions = [".jpg", ".jpeg", ".png"];

async function getImages(dir) {
  const entries = await fs.promises.readdir(dir, {
    withFileTypes: true,
  });

  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      // Skip the old compressed folder
      if (entry.name !== "compressed") {
        files.push(...(await getImages(fullPath)));
      }
    } else {
      const ext = path.extname(entry.name).toLowerCase();

      if (supportedExtensions.includes(ext)) {
        files.push(fullPath);
      }
    }
  }

  return files;
}

async function compressImages() {
  console.log("🔍 Finding images...");

  const images = await getImages(publicDir);

  console.log(`📸 Found ${images.length} images.`);

  for (const inputPath of images) {
    const parsed = path.parse(inputPath);

    // Create WebP in the SAME folder as the original
    const outputPath = path.join(
      parsed.dir,
      `${parsed.name}.webp`
    );

    await sharp(inputPath)
      .resize({
        width: 1920,
        height: 1920,
        fit: "inside",
        withoutEnlargement: true,
      })
      .webp({
        quality: 82,
        effort: 5,
      })
      .toFile(outputPath);

    console.log(
      `✅ ${path.relative(publicDir, inputPath)} → ${parsed.name}.webp`
    );
  }

  console.log("\n🎉 ALL IMAGES COMPRESSED!");
  console.log("📁 WebP files are inside the same public folders.");
}

compressImages().catch((error) => {
  console.error("\n❌ Compression failed:");
  console.error(error);
  process.exit(1);
});