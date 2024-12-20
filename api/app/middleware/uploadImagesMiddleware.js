const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const mongoose = require("mongoose");

const storage = new GridFsStorage({
  url: process.env.MONGO_URL,
  file: async (req, file) => {
    const collection = file.fieldname;
    const existingFile = await mongoose.connection.db
      .collection(`${collection}.files`)
      .findOne({
        filename: file.originalname,
      });

    if (existingFile) {
      return {
        filename: existingFile.filename,
        bucketName: collection,
      };
    }
    const filename = `${Date.now()}_${file.originalname}`;
    const fileInfo = {
      filename: filename,
      bucketName: collection,
    };

    return fileInfo;
  },
});

const filter = (req, file, cb) => {
  if (file.fieldname === "audio") {
    console.log("audio");
    if (!file.originalname.match(/\.(mp3|wav|ogg)$/)) {
      req.fileValidationError =
        "Invalid audio format. Only mp3, wav, and ogg files are allowed.";
      return cb(new Error("Invalid audio format"), false);
    }
    cb(null, true);
  } else {
    console.log("image");
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      req.fileValidationError =
        "Invalid image format. Only jpeg, jpg, png and gif images are allowed.";
      return cb(new Error("Invalid image format"), false);
    }
    cb(null, true);
  }
};

const upload = multer({ storage, fileFilter: filter });
// const uploadAudio = multer({ storage, fileFilter: audioFilter });

const uploadAvatar = upload.single("avatars");
const uploadPostcard = upload.fields([
  { name: "images", maxCount: 2 },
  { name: "stickers", maxCount: 20 },
  { name: "audio", maxCount: 1 },
]);

module.exports = {
  uploadAvatar,
  uploadPostcard,
};
