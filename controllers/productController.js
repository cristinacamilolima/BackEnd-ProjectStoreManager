const productService = require('../services/productService');

const getAllProducts = async (_req, res) => {
    const products = await productService.getAll();
  
    res.status(200).json(products);
};

const findProductById = async (req, res) => {
    const { id } = req.params;
  
    const product = await productService.findById(id);
  
    if (!product) return res.status(404).json({ message: 'Product not found' });
  
    res.status(200).json(product);
  };

module.exports = {
    getAllProducts,
    findProductById,
};  