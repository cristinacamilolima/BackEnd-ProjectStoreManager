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

const create = async (sales) => {        
    const sale = await saleModel.createSale();

    await Promise.all(sales.map((item) => saleModel.createSaleProduct(
      sale.saleId, item.productId, item.quantity,
        )));

    return ({ id: sale.saleId, itemsSold: [...sales] });
  };

  const update = async (saleId, productId, quantity) => {  
    const saleProduct = await saleModel.updateSaleProduct(saleId, productId, quantity);
  
    if (!saleProduct) return null;
  
    return ({ saleId, itemUpdated: [{ productId, quantity }] });
  };

module.exports = {
  getAll,
  findById,
  create,
  update,
};
