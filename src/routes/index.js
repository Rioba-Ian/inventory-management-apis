const express = require("express");

const router = express.Router();

const inventoryControllers = require("../controllers/InventoryController");

// catagory routes
router.get("/categories", inventoryControllers.getAllCategories);

router.get("/categories/:id", inventoryControllers.getOneCategory);

router.post("/categories", inventoryControllers.createCategory);

router.delete("/categories/:id", inventoryControllers.deleteCategory);

router.put("/categories/:id", inventoryControllers.updateCategory);

// item routes
router.get("/", inventoryControllers.getAllItems);

router.get("/:id", inventoryControllers.getOneItem);

router.post("/", inventoryControllers.createItem);

router.delete("/:id", inventoryControllers.deleteItem);

router.put("/:id", inventoryControllers.updateItem);

module.exports = router;
