const mongoose = require('mongoose');

const articleSchema = mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
    },
    Category: {
      type: String,
    },
    Author: {
      type: String,
      required: true,
    },
    Institution: {
      type: String,
      required: true,
    },
    Description: {
      type: String,
      default: '',
    },
    Content: {
      type: String,
      required: true,
    },
    articleImage: {
      type: String,
      required: true,
    },
    imageDeleteHash: {
      type: String,
    },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  }
);

const articleModel = mongoose.model('Article', articleSchema);

module.exports = articleModel;
