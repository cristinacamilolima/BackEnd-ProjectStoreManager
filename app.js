const express = require('express');
const bodyParser = require('body-parser');
const productController = require('./controllers/productController');
const saleController = require('./controllers/saleController');
const validator = require('./middlewares/validator');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', productController.getAllProducts);

app.get('/products/:id', productController.findProductById);

app.post('/products', validator.isValidProduct, productController.createProduct);

app.put('/products/:id', productController.updateProduct);

app.delete('/products/:id', productController.deleteProduct);

app.get('/sales', saleController.getAllSales);

app.get('/sales/:id', saleController.findSaleById);

app.post('/sales', validator.isValidSale, saleController.createSaleProduct);

app.put('/sales/:id', saleController.updateSaleProduct);

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;
