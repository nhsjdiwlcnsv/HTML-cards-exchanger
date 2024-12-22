const assetsService = require("../services/assets");

async function readAllImages(req, res) {
  try {
    const images = await assetsService.readAllImages();
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function readAllAudio(req, res) {
  try {
    const audio = await assetsService.readAllAudio();
    res.status(200).json(audio);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function readAllStickers(req, res) {
  try {
    const stickers = await assetsService.readAllStickers();
    res.status(200).json(stickers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  readAllImages,
  readAllAudio,
  readAllStickers,
};
