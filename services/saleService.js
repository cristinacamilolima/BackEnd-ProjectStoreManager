const saleModel = require('../models/saleModel');
const productModel = require('../models/productModel');

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
    const product = await productModel.findById(sales[0].productId);

    if ((product.quantity - sales[0].quantity) < 1) {
      return { error: 'Such amount is not permitted to sell' };
    }

    const sale = await saleModel.createSale();

    await Promise.all(sales.map((item) => saleModel.createSaleProduct(
      sale.saleId, item.productId, item.quantity,
        )));

    await productModel.updateStockProduct(
      sales[0].productId, (product.quantity - sales[0].quantity),
      );

    return ({ id: sale.saleId, itemsSold: [...sales] });
  };

  const update = async (saleId, productId, quantity) => {  
    const saleProduct = await saleModel.updateSaleProduct(saleId, productId, quantity);
  
    if (!saleProduct) return null;
  
    return ({ saleId, itemUpdated: [{ productId, quantity }] });
  };

  const deleteSale = async (id) => {
    const existingSale = await saleModel.findById(id);
  
    if (!existingSale) {
      return { error: 'Sale not found' };
    }

    const product = await productModel.findById(existingSale[0].productId);

    const sale = await saleModel.deleteSale(id);
  
    if (!sale) return null;

    const saleProduct = await saleModel.deleteSaleProduct(id);
  
    if (!saleProduct) return null;

    await productModel.updateStockProduct(
      existingSale[0].productId, (existingSale[0].quantity + product.quantity),
      );

    return { id };
  };

module.exports = {
  getAll,
  findById,
  create,
  update,
  deleteSale,
};
