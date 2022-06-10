const productModel = require('../models/productModel');

const getNewProduct = (productData) => {
  const { id, name, quantity } = productData;

  return {
    id,
    name,
    quantity,
  };
};

const getAll = async () => {
    const products = await productModel.getAllProducts();
  
    return products.map(getNewProduct);
};

const findById = async (id) => {
  const product = await productModel.findById(id);

  if (!product) return null;

  return getNewProduct(product);
};

module.exports = {
  getAll,
  findById,
};
