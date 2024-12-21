const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const mongoose = require("mongoose");

const storage = new GridFsStorage({
  url: process.env.MONGO_URL,
  file: async (req, file) => {
    let collection = file.fieldname;
    if (collection === "bgImage" || collection === "frameImage") {
      collection = "images";
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
    if (!file.originalname.match(/\.(mp3|wav|ogg)$/)) {
      req.fileValidationError =
        "Invalid audio format. Only mp3, wav, and ogg files are allowed.";
      return cb(new Error("Invalid audio format"), false);
    }
    cb(null, true);
  } else {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      req.fileValidationError =
        "Invalid image format. Only jpeg, jpg, png and gif images are allowed.";
      return cb(new Error("Invalid image format"), false);
    }
    cb(null, true);
  }
};

const upload = multer({ storage, fileFilter: filter });

const uploadAvatar = upload.single("avatars");
const uploadPostcard = upload.fields([
  { name: "bgImage", maxCount: 1 },
  { name: "frameImage", maxCount: 1 },
  { name: "stickers", maxCount: 20 },
  { name: "audio", maxCount: 1 },
]);

module.exports = {
  uploadAvatar,
  uploadPostcard,
};
