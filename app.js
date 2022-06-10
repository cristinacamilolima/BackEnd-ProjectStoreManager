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

app.post('/products', validator.isValidProduct, () => { console.log('teste'); });

app.get('/sales', saleController.getAllSales);

app.get('/sales/:id', saleController.findSaleById);

app.post('/sales', validator.isValidSale, () => { console.log('testeSales'); });

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;
