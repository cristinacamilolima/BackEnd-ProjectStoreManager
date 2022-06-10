const isValidProduct = (req, res, next) => {
    const { name, quantity } = req.body;
    
    if (!name) {
        return res.status(400).json({ message: '"name" is required' });
    }
    if (name.length < 5) {
        return res.status(422).json({ 
            message: '"name" length must be at least 5 characters long' });
    }
    if (quantity === undefined) {
        return res.status(400).json({ message: '"quantity" is required' });
    }
    if (quantity <= 0) {
        return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
    }
    
    next();
};

const isValidSale = (req, res, next) => {
    const b = req.body;
    
    b.map((saleData) => {
        const { productId, quantity } = saleData;
        
            if (!productId) {
                return res.status(400).json({ message: '"productId" is required' });
            }
            if (quantity === undefined) {
                return res.status(400).json({ message: '"quantity" is required' });
            }
            if (quantity <= 0) {
                return res.status(422).json({ 
                    message: '"quantity" must be greater than or equal to 1' });
            }
          return null;
    });

    next();
};

module.exports = { isValidProduct, isValidSale };