const mongoose = require("mongoose");

async function readAllImages() {
  try {
    const files = await mongoose.connection.db
      .collection("images.files")
      .find()
      .toArray();
    return files;
  } catch (error) {
    throw new Error(
      `Failed to fetch files from images.files: ${error.message}`
    );
  }
}

async function readAllAudio() {
  try {
    const files = await mongoose.connection.db
      .collection("audio.files")
      .find()
      .toArray();
    return files;
  } catch (error) {
    throw new Error(`Failed to fetch files from audio.files: ${error.message}`);
  }
}

async function readAllStickers() {
  try {
    const files = await mongoose.connection.db
      .collection("stickers.files")
      .find()
      .toArray();
    return files;
  } catch (error) {
    throw new Error(
      `Failed to fetch files from stickers.files: ${error.message}`
    );
  }
}

module.exports = {
  readAllImages,
  readAllAudio,
  readAllStickers,
};
