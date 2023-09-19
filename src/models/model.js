const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const itemsSchema = new Schema({
  name: { required: true, type: String, maxLength: 255 },
  description: { type: String },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  price: { type: Number },
  in_stock: { type: Number },
  images: [String],
});

itemsSchema.virtual("url").get(function () {
  return `/shoppingitems/${this._id}`;
});

module.exports = mongoose.model("Items", itemsSchema);
