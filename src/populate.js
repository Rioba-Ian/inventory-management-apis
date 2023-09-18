console.log(
  `This script populates some test items and categories to the shopping items database.`
);

// Get args passed on command line

const userArgs = process.argv.slice(2);

const Item = require("./models/model");

const Category = require("./models/category");

const items = [];
const categories = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.error(err));

async function main() {
  console.log("Debug: About to connect.");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createCategories();
  await createItems();
  console.log("Debug: Closing mongoose.");
  mongoose.connection.close();
}

async function categoryCreate(index, name, description) {
  const category = new Category({ name: name, description: description });
  await category.save();
  categories[index] = category;
  console.log(`Added category: ${name}`);
}

async function itemCreate(
  index,
  name,
  description,
  category,
  price,
  in_stock,
  images
) {
  const item = new Item({
    name: name,
    description: description,
    category: category,
    price: price,
    in_stock: in_stock,
    images: images,
  });

  if (category != false) item.category = category;
  await item.save();
  items[index] = item;
  console.log(`Added item: ${name}`);
}

async function createCategories() {
  console.log("Debug: Creating categories.");
  await Promise.all([
    categoryCreate(0, "Fruit", "Fruit is good for you."),
    categoryCreate(1, "Vegetables", "Vegetables are good your health."),
    categoryCreate(2, "Meat", "Meat makes you tone up.."),
  ]);
}

async function createItems() {
  console.log("Debug: Creating items.");

  await Promise.all([
    itemCreate(
      0,
      "Apple",
      "An apple a day keeps the doctor away.",
      categories[0],
      1.99,
      100,
      [
        "https://images.unsplash.com/photo-1579613832125-5d34a13ffe2a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3270&q=80",
        "https://images.unsplash.com/photo-1584306670957-acf935f5033c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3386&q=80",
      ]
    ),
    itemCreate(
      1,
      "Banana",
      "Bananas are good for you.",
      categories[0],
      2.99,
      100,
      [
        "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3280&q=80",
      ]
    ),
    itemCreate(
      2,
      "Orange",
      "Oranges are good for you.",
      categories[0],
      3.99,
      100,
      [
        "https://images.unsplash.com/photo-1626062985882-07e999ea0ea5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3435&q=80",
      ]
    ),
  ]);
}
