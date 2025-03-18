import asyncHandler from "../middlewares/asyncHandler";
import Product from "../models/productModel";

const addProducts = asyncHandler(async (req, res) => {
  try {
    const { name, description, price, category, quantity, brand } = req.field;
    switch (true) {
      case !name:
        return res.status(400).json("Please provide product name");
      case !description:
        return res.status(400).json("Please provide product description");
      case !price:
        return res.status(400).json("Please provide product price");
      case !category:
        return res.status(400).json("Please provide product category");
      case !quantity:
        return res.status(400).json("Please provide product quantity");
      case !brand:
        return res.status(400).json("Please provide product brand");
    }

    const existingProduct = await Product.findOne({ name });
    if (existingProduct) {
      return res.status(400).json("Product already exists");
    }
    const product = new Product({ ...req.field });
    const productSaved = await product.save();
    if (!productSaved) {
      return res.status(400).json("Failed to save product");
    }
    res.status(201).json(productSaved);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

const updateProduct = asyncHandler(async (req, res) => {
  try {
    const { name, description, price, category, quantity, brand } = req.field;
    switch (true) {
      case !name:
        return res.status(400).json("Please provide product name");
      case !description:
        return res.status(400).json("Please provide product description");
      case !price:
        return res.status(400).json("Please provide product price");
      case !category:
        return res.status(400).json("Please provide product category");
      case !quantity:
        return res.status(400).json("Please provide product quantity");
      case !brand:
        return res.status(400).json("Please provide product brand");
    }
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json("Product not found");
    }
    if (name) product.name = name;
    if (description) product.description = description;
    if (price) product.price = price;
    if (category) product.category = category;
    if (quantity) product.quantity = quantity;
    if (brand) product.brand = brand;
    const updatedProduct = await product.save();
    if (!updatedProduct) {
      return res.status(400).json("Failed to update product");
    }
    res.status(201).json(updatedProduct);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

const removeProduct = asyncHandler(async (req, res) => {
  try {
    const removedProduct = await Product.findByIdAndDelete(req.params.id);
    res.json(removedProduct);
  } catch {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const fetchProducts = asyncHandler(async (req, res) => {
  try {
    const pageSize = 6;

    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};

    const count = await Product.countDocuments({ ...keyword });
    const products = await Product.find({ ...keyword }).limit(pageSize);

    res.json({
      products,
      page: 1,
      pages: Math.ceil(count / pageSize),
      hasMore: false,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});

const fetchProductById = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      return res.json(product);
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: "Product not found" });
  }
});

const fetchAllProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({})
      .populate("category")
      .limit(12)
      .sort({ createAt: -1 });

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});

const addProductReview = asyncHandler(async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);

    if (product) {
      const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );

      if (alreadyReviewed) {
        res.status(400);
        throw new Error("Product already reviewed");
      }

      const review = {
        name: req.user.username,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };

      product.reviews.push(review);

      product.numReview = product.reviews.length;

      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;

      await product.save();
      res.status(201).json({ message: "Review added" });
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});

const fetchTopProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({}).sort({ rating: -1 }).limit(4);
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});

const fetchNewProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find().sort({ _id: -1 }).limit(5);
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});

const filterProducts = asyncHandler(async (req, res) => {
  try {
    const { checked, radio } = req.body;

    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };

    const products = await Product.find(args);
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});

export default {
  addProducts,
  updateProduct,
  removeProduct,
  fetchProducts,
  fetchProductById,
  fetchAllProducts,
  addProductReview,
  fetchTopProducts,
  fetchNewProducts,
  filterProducts,
};
