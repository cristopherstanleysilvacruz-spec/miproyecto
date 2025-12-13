const Product = require("../models/Product");

// GET ALL
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener productos" });
  }
};

// GET BY ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: "ID inválido" });
  }
};

// CREATE
exports.createProduct = async (req, res) => {
  try {
    const nuevoProducto = new Product(req.body);
    const saved = await nuevoProducto.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: "Error al crear producto" });
  }
};

// UPDATE
exports.updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: "Error al actualizar producto" });
  }
};

// DELETE
exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Producto eliminado correctamente" });
  } catch (error) {
    res.status(400).json({ message: "Error al eliminar producto" });
  }
};
