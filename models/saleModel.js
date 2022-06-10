const connection = require('./connection');

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

const getNewSaleProduct = (saleProductData) => {
    const {
        saleId, productId, quantity,
    } = saleProductData;
  
    return {
        saleId, productId, quantity,
    };
  };

const serialize = (saleData) => saleData.map((item) => getNewSale({
    saleId: item.sale_id,
    date: item.date,
    productId: item.product_id,
    quantity: item.quantity,  
}));

const getAllSales = async () => {
  const [resultSales] = await connection.execute(
    `select sp.sale_id, s.date, sp.product_id, sp.quantity 
    from sales_products sp 
    inner join sales s on sp.sale_id = s.id`,
  );

  return serialize(resultSales);
};

const findById = async (id) => {
  const query = `
    select sp.sale_id, s.date, sp.product_id, sp.quantity 
    from sales_products sp 
    inner join sales s on sp.sale_id = s.id
    where sp.sale_id = ?
  `;

  const [resultSales] = await connection.execute(query, [id]);

  if (resultSales.length === 0) return null;

  return serialize(resultSales);
};

const createSale = async () => {
    const [sale] = await connection.execute(
      'insert into sales (date) values (NOW());',      
    );
    return { saleId: sale.insertId };
  };

const createSaleProduct = async (saleId, productId, quantity) => {
    await connection.execute(
        'insert into sales_products (sale_id, product_id, quantity) values (?, ?, ?)',
        [saleId, productId, quantity],
    );

    return getNewSaleProduct({ productId, quantity });
};

const updateSaleProduct = async (saleId, productId, quantity) => {
  await connection.execute(
    'update sales_products set product_id=?, quantity=? where sale_id=?',
    [productId, quantity, saleId],
  );
  return getNewSaleProduct({ productId, quantity });
};

module.exports = {
    getAllSales,
    findById,
    createSale,
    createSaleProduct,
    updateSaleProduct,
};
