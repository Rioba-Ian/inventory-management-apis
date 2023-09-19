const Items = require("../models/model");

const Category = require("../models/category");

const mongoose = require("mongoose");

// category controllers
const getAllCategories = async (req, res) => {
  try {
    const allCategories = await Category.find().exec();
    console.log(allCategories);
    res.status(200).json(allCategories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server error" });
  }
};

const getOneCategory = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: "Invalid ID." });
  }
  try {
    const data = await Category.findById(req.params.id);
    if (!data) {
      return res.status(404).json({ error: "Category not found." });
    }
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

const createCategory = async (req, res) => {
  const { name, description } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Name of category is required." });
  }

  try {
    const category = new Category({
      name: name,
      description: description,
    });

    await category.save();

    res.status(201).json(category);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error." });
  }
};

const deleteCategory = async (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res
      .status(500)
      .json({ error: "The id must be specified for delete." });
  }

  try {
    const data = await Category.findByIdAndDelete(id);
    res.send(`Document with ${data.name} has been deleted.`);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

const updateCategory = async (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res
      .status(400)
      .json({ error: "The id for update must be specified in params." });
  }

  try {
    const updatedData = req.body;
    const options = { new: true };

    const result = await Category.findByIdAndUpdate(id, updatedData, options);

    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
};

// item controllers
const getAllItems = async (req, res) => {
  try {
    const allItems = await Items.find().exec();
    console.log(allItems);
    res.status(200).json(allItems);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getOneItem = async (req, res) => {
  try {
    const result = await Items.findById(req.params.id);
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// to implement
const createItem = async (req, res) => {
  const { name, category, description, price, in_stock, images } = req.body;

  if (!name || !category) {
    return res.status(400).json({
      error:
        "Name, category and description are needed for creating an new item.",
    });
  }

  if (!Array.isArray(images)) {
    return res
      .status(400)
      .json({ error: "Images must be array of image URLs." });
  }

  try {
    const checkCategoryExistsCount = await Category.findOne({ _id: category });

    console.log(checkCategoryExistsCount, "check category exists.");

    if (!checkCategoryExistsCount) {
      return res.status(400).json({ error: "Category does not exist." });
    } else {
      const item = new Items({
        name,
        category,
        price,
        in_stock,
        images,
      });

      await item.save();

      res.status(201).json(item);
    }
  } catch (err) {
    console.error(err);

    if (err.name === "CastError" && err.path === "category") {
      return res.status(400).json({ error: "Invalid category ID." });
    }

    res.status(500).json({ error: err.message });
  }
};

const deleteItem = async (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res
      .status(400)
      .json({ error: "The id for delete must be specified." });
  }

  try {
    const data = await Items.findByIdAndDelete(id);
    res.status(200).json({ message: `Item ${data.name} has been deleted.` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// to implement
const updateItem = async (req, res) => {};

module.exports = {
  getAllCategories,
  getOneCategory,
  createCategory,
  deleteCategory,
  updateCategory,
  getAllItems,
  getOneItem,
  deleteItem,
  createItem,
  updateItem,
};
