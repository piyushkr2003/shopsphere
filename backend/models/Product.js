const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User', // Reference to the admin user who created it
    },
    name: {
      type: String,
      required: [true, 'Please add a product name'],
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
    },
    price: {
      type: Number,
      required: [true, 'Please add a price'],
      default: 0,
    },
    category: {
      type: String,
      required: [true, 'Please add a category'],
    },
    countInStock: {
      type: Number,
      required: [true, 'Please add count in stock'],
      default: 0,
    },
    imageUrl: {
      type: String,
      required: [true, 'Please add an image URL'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Product', productSchema);
