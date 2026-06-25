const Product = require("../models/Product");
const cloudinaryUpload = require("../middleware/cloudinaryUpload");

const addProduct = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!req.file) {
      return res.status(400).json({
        message: "Image is required",
      });
    }

    const uploadedImage = await cloudinaryUpload(req.file);

    const product = await Product.create({
      title,
      description,
      image: uploadedImage.secure_url,
      createdBy: req.user.id,
    });

    res.status(201).json({
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "Products fetched successfully",
      products,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const editProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const { title, description } = req.body;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    if (product.createdBy.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You are not authorized to edit this product",
      });
    }

    if (title) product.title = title;
    if (description) product.description = description;

    if (req.file) {
      const uploadedImage = await cloudinaryUpload(req.file);

      product.image = uploadedImage.secure_url;
    }

    await product.save();

    res.status(200).json({
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getSingleProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findById(productId).populate(
      "createdBy",
      "name email"
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json({
      message: "Product fetched successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const likeProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    const alreadyLiked = product.likes.includes(req.user.id);

    if (alreadyLiked) {
      product.likes.pull(req.user.id);

      await product.save();

      return res.status(200).json({
        message: "Product unliked successfully",
        product,
      });
    }

    product.likes.push(req.user.id);

    await product.save();

    res.status(200).json({
      message: "Product liked successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getLikedProducts = async (req, res) => {
  try {
    const products = await Product.find({
      likes: req.user.id,
    })
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "Liked products fetched successfully",
      products,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    if (product.createdBy.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You are not authorized to delete this product",
      });
    }

    await Product.findByIdAndDelete(productId);

    res.status(200).json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addProduct,
  getAllProducts,
  editProduct,
  likeProduct,
  getLikedProducts,
  getSingleProduct,
  deleteProduct,
};