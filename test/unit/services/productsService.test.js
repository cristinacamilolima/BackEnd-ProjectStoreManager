const sinon = require('sinon');
const {expect} = require('chai');
const productsModel = require('../../../models/productModel')
const productsService = require('../../../services/productService');

describe('Buscando todos os produtos', () => {
  before(() => {
    const products = [
      {
        "id": 1,
        "name": "Martelo de Thor",
        "quantity": 10
      }
    ];
    sinon.stub(productsModel, 'getAllProducts').resolves(products);
  })
  after(() => {
    productsModel.getAllProducts.restore();
  })

  it('O retorno dos produtos é um array', async () => {
    const product = await productsService.getAll();
    expect(product).to.be.an('array');
  })
  it('O retorno dos produtos é um objeto', async () => {
    const [product] = await productsService.getAll();
    expect(product).to.be.an('object');
  })
  it('O retorno não é vazio', async () => {
    const [product] = await productsService.getAll();
    expect(product).not.to.be.empty;
  })
});

describe('Buscando produtos por ID', () => {
  before(() => {
    const products = [[
      {
        "id": 1,
        "name": "Martelo de Thor",
        "quantity": 10
      }
    ]];
    sinon.stub(productsModel, 'findById').resolves(products);
  })
  after(() => {
    productsModel.findById.restore();
  })

  it('O retorno dos produtos não é um array', async () => {
    const product = await productsService.findById(1);
    expect(product).not.to.be.an('array');
  })
  it('O retorno dos produtos é um objeto', async () => {
    const product = await productsService.findById(1);    
    expect(product).to.be.an('object');
  })
  it('O retorno não é vazio', async () => {
    const product = await productsService.findById(1);
    expect(product).not.to.be.empty;
    productsModel.findById.restore();
  })
  it('Caso não exista, retorna null', async () => {
    sinon.stub(productsModel, 'findById').resolves(null);
    const product = await productsService.findById(5);
    expect(product).to.be.null;
  })
});

describe('Deve-se criar um produto', () => {
  before(() => {
    const products = [
      {
        "id": 1,
        "name": "Martelo de Thor",
        "quantity": 10
      }
    ];
    sinon.stub(productsModel, 'createProduct').resolves(products);
  })
  after(() => {
    productsModel.createProduct.restore();
  })

  it('Deve-se criar um produto', async () => {    
    const product = await productsService.create('Jarvis', 10)
    expect(product).to.have.property('id');
  })
});