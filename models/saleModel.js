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

module.exports = {
    getAllSales,
    findById,
};
