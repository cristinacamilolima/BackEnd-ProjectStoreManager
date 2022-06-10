const saleService = require('../services/saleService');

const getAllSales = async (_req, res) => {
    const sales = await saleService.getAll();
  
    res.status(200).json(sales);
};

const findSaleById = async (req, res) => {
    const { id } = req.params;
  
    const sale = await saleService.findById(id);
  
    if (!sale) return res.status(404).json({ message: 'Sale not found' });
  
    res.status(200).json(sale);
  };

module.exports = {
    getAllSales,
    findSaleById,
};  