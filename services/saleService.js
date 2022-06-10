const saleModel = require('../models/saleModel');

const getNewSale = (saleData) => {
    const {
      saleId,
      date,
      productId,
      quantity,
    } = saleData;
  
    return {
      saleId,
      date,
      productId,
      quantity,
    };
  };

  const getCustomSale = (saleData) => {
    const {      
      date,
      productId,
      quantity,
    } = saleData;
  
    return {      
      date,
      productId,
      quantity,
    };
  };
  
const getAll = async () => {
    const sales = await saleModel.getAllSales();
  
    return sales.map(getNewSale);
};

const findById = async (id) => {
  const sale = await saleModel.findById(id);

  if (!sale) return null;

  return sale.map(getCustomSale);
};

module.exports = {
  getAll,
  findById,
};
