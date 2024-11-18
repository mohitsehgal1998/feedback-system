// productModel.js

import mongoose from "mongoose";

// Define the Product schema
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
  },
  category: {
    type: String,
    required: true,
    enum: ["Electronics", "Clothing", "Furniture", "Books", "Groceries"], // Customize categories as needed
  },
});

export default mongoose.models.Products ||
  mongoose.model("Products", productSchema);
