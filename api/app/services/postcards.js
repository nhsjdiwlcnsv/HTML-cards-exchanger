const Postcard = require("../models/Postcard");
const mongoose = require("mongoose");

async function create(data, files) {
  const {
    owner,
    recipients,
    title,
    description,
    frame,
    stickers,
    interactiveElements,
  } = data;

  if (files?.frameImage?.[0]?.id) {
    frame.image = files?.frameImage?.[0]?.id;
  }

  if (files?.stickers) {
    files.stickers.map((sticker) => {
      stickers.push({
        image: sticker?.id,
        position: {
          x: 0,
          y: 0,
        },
      });
    });
  }

  return await Postcard.create({
    owner,
    recipients,
    title: title,
    description: description,
    frame: frame,
    stickers: stickers,
    interactiveElements: interactiveElements,
    background: files?.bgImage?.[0]?.id || null,
    audio: files?.audio?.[0]?.id || null,
  });
}

async function update(id, data, files) {
  const updates = { ...data };

  if (files?.bgImage?.[0]?.id) {
    updates.background = files.bgImage[0].id;
  }

  if (files?.audio?.[0]?.id) {
    updates.audio = files.audio[0].id;
  }

  if (files?.frameImage?.[0]?.id) {
    updates.frame = {
      type: "full",
      thickness: 5,
      image: files.frameImage[0].id,
    };
  }

  if (files?.stickers) {
    updates.stickers = [];
    files.stickers.map((sticker) => {
      updates.stickers.push({
        image: sticker?.id,
        position: {
          x: 0,
          y: 0,
        },
      });
    });
  }
  return await Postcard.findByIdAndUpdate(id, updates, { new: true });
}

async function readPostcardById(id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid Postcard ID");
  }

  const postcard = await Postcard.findById(id);

  if (!postcard) {
    throw new Error("Postcard not found");
  }

  return populatePostcard(postcard);
}

async function remove(id) {
  return await Postcard.findByIdAndDelete(id);
}

async function readOwnedPostcards(userId) {
  const postcard = await Postcard.find({ owner: userId });

  return populatePostcard(postcard);
}

async function readReceivedPostcards(userId) {
  const postcard = await Postcard.find({ recipients: userId });

  return populatePostcard(postcard);
}

async function readAllPostcards() {
  const postcards = await Postcard.find();
  for (let postcard of postcards) {
    postcard = populatePostcard(postcard);
  }
  return postcards;
}

async function populatePostcard(postcard) {
  if (postcard.recipients) {
    postcard.recipients = postcard.recipients.map(async (recipient) => {
      await mongoose.connection.db
        .collection("users")
        .findOne({ _id: recipient });
    });
  }

  if (postcard.background) {
    postcard.background = await mongoose.connection.db
      .collection("images.files")
      .findOne({ _id: postcard.background });
  }

  if (postcard.audio) {
    postcard.audio = await mongoose.connection.db
      .collection("audio.files")
      .findOne({ _id: postcard.audio });
  }

  if (postcard.frame && postcard.frame.image) {
    postcard.frame.image = await mongoose.connection.db
      .collection("images.files")
      .findOne({ _id: postcard.frame.image });
  }

  if (Array.isArray(postcard.stickers)) {
    for (const sticker of postcard.stickers) {
      if (sticker.image) {
        sticker.image = await mongoose.connection.db
          .collection("images.files")
          .findOne({ _id: sticker.image });
      }
    }
  }

  return postcard;
}

module.exports = {
  create,
  update,
  readPostcardById,
  remove,
  readOwnedPostcards,
  readReceivedPostcards,
  readAllPostcards,
};
