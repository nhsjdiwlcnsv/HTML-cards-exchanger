const assetsService = require("../services/assets");
const mongoose = require("mongoose");
const Grid = require("gridfs-stream");
const { ObjectId } = require("mongodb");
const conn = mongoose.connection;

async function getAvatar(req, res) {
  console.log("B")
  let gfs = Grid(conn.db, mongoose.mongo);
  
  gfs.collection("avatars");
  let gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {bucketName: 'avatars'});

  const file = await gfs.files.findOne({ _id: new mongoose.Types.ObjectId(req.params.id) })
  console.log(req.params.id)
  if(!file){
    return res.json(null);
  }
  const readStream = gridfsBucket.openDownloadStreamByName(file.filename);
  
  readStream.pipe(res);
}

async function getImage(req, res) {
  console.log("B")
  let gfs = Grid(conn.db, mongoose.mongo);
  
  gfs.collection("images");
  let gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {bucketName: 'images'});

  const file = await gfs.files.findOne({ _id: new mongoose.Types.ObjectId(req.params.id) })
  console.log(req.params.id)
  const readStream = gridfsBucket.openDownloadStreamByName(file.filename);
  
  readStream.pipe(res);
}

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
  getAvatar,
  getImage,
  readAllImages,
  readAllAudio,
  readAllStickers,
};
