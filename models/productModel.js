const connection = require('./connection');

const getNewProduct = (productData) => {
  const {
    id,
    name,
    quantity,
  } = productData;

  return {
    id,
    name,
    quantity,
  };
};

const serialize = (productData) => productData.map((item) => getNewProduct({
  id: item.id,
  name: item.name,
  quantity: item.quantity,  
}));

const getAllProducts = async () => {
  const [resultProducts] = await connection.execute(
    'select id, name, quantity from products order by id asc;',
  );

  return serialize(resultProducts);
};

const findById = async (id) => {
  const query = 'select id, name, quantity from products where id=?';

  const [resultProducts] = await connection.execute(query, [id]);

  if (resultProducts.length === 0) return null;

  return serialize(resultProducts)[0];
};

const findByName = async (name) => {
  const query = 'select id, name, quantity from products where name=?';

  const [resultProducts] = await connection.execute(query, [name]);

  if (resultProducts.length === 0) return null;

  return serialize(resultProducts)[0];
};

const createProduct = async (name, quantity) => {
  const [product] = await connection.execute(
    'insert into products (name, quantity) values (?,?)',
    [name, quantity],
  );
  return getNewProduct({ id: product.insertId, name, quantity });
};

module.exports = {
  getAllProducts,
  findById,
  createProduct,
  findByName,
};
