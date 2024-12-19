const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");

const storage = new GridFsStorage({
  url: process.env.MONGO_URL,
  file: (req, file) => {
    const filename = `${Date.now()}_${file.originalname}`;
    const metadata = { owner: null };
    const fileInfo = {
      filename: filename,
      bucketName: "avatars",
      metadata: metadata,
    };

    return fileInfo;
  },
});

const imageFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    req.fileValidationError =
      "Invalid image format. Only jpeg, jpg, png and gif images are allowed.";
    return cb(new Error("Invalid image format"), false);
  }
  cb(null, true);
};

const upload = multer({ storage, fileFilter: imageFilter });

module.exports = upload.single("avatar");
