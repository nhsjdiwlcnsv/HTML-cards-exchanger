const mongoose = require("mongoose");
const { nanoid } = require("nanoid");

const PostcardSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  recipients: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  title: {
    value: {
      type: String,
      trim: true,
      required: true,
    },
    position: {
      x: { type: Number, required: true },
      y: { type: Number, required: true },
    },
  },
  description: {
    value: {
      type: String,
      trim: true,
      required: true,
    },
    position: {
      x: { type: Number, required: true },
      y: { type: Number, required: true },
    },
  },
  background: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "images.files",
  },
  audio: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "audio.files",
  },
  frame: {
    type: {
      type: String,
      required: true,
      enum: ["full", "top-bottom", "left-right"],
    },
    thickness: {
      type: Number,
      required: true,
    },
    color: {
      type: String,
    },
    image: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "images.files",
    },
  },
  stickers: [
    {
      image: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "stickers.files",
        required: true,
      },
      position: {
        x: { type: Number, required: true },
        y: { type: Number, required: true },
      },
    },
  ],
  interactiveElements: [
    {
      type: {
        type: String,
        required: true,
        color: {
          type: String,
        },
        enum: ["textarea-button", "two-buttons", "single-button"],
      },
      position: {
        x: { type: Number, required: true },
        y: { type: Number, required: true },
      },
      text: {
        type: String,
      },
      label: [
        {
          type: String,
        },
      ],
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  shareableLink: {
    type: String,
    unique: true,
    required: true,
  },
});

PostcardSchema.pre("validate", function (next) {
  if (!this.shareableLink) {
    this.shareableLink = nanoid(10);
  }
  next();
});

const Postcard = mongoose.model("Postcard", PostcardSchema);

module.exports = Postcard;
