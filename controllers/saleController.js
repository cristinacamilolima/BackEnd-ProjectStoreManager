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

const createSaleProduct = async (req, res) => {
    const sale = await saleService.create(req.body);

    res.status(201).json(sale);
};

const updateSaleProduct = async (req, res) => {
    const { id } = req.params;
    const { productId, quantity } = req.body[0];   

    const saleProduct = await saleService.update(id, productId, quantity);

    if (saleProduct.error) {
        return res.status(404).json({ message: saleProduct.error });
    }

    res.status(200).json(saleProduct);
};

const deleteSaleProduct = async (req, res) => {
    const { id } = req.params;    

    const sale = await saleService.deleteSale(id);

    if (sale.error) {
        return res.status(404).json({ message: sale.error });
    }    

    res.status(204).send();
};

module.exports = {
    getAllSales,
    findSaleById,
    createSaleProduct,
    updateSaleProduct,
    deleteSaleProduct,
};  