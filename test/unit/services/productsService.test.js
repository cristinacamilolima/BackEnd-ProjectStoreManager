const sinon = require('sinon');
const {expect} = require('chai');
const productsModel = require('../../../models/productModel')
const productsService = require('../../../services/productService');

describe('Buscando todos os produtos', () => {
  before(() => {
    const products = [
      {
        "id": 1,
        "name": "produto A",
        "quantity": 10
      }
    ];
    sinon.stub(productsModel, 'getAllProducts').resolves(products);
  })
  after(() => {
    productsModel.getAllProducts.restore();
  })

  it('O retorno dos produtos é um array', async () => {
    const response = await productsService.getAll();
    expect(response).to.be.an('array');
  })
  it('O retorno dos produtos é um objeto', async () => {
    const [response] = await productsService.getAll();
    expect(response).to.be.an('object');
  })
  it('O retorno não é vazio', async () => {
    const [response] = await productsService.getAll();
    expect(response).not.to.be.empty;
  })
});

describe('Buscando produtos por ID', () => {
  before(() => {
    const products = [[
      {
        "id": 1,
        "name": "produto A",
        "quantity": 10
      }
    ]];
    sinon.stub(productsModel, 'findById').resolves(products);
  })
  after(() => {
    productsModel.findById.restore();
  })

  it('O retorno dos produtos não é um array', async () => {
    const response = await productsService.findById(1);
    expect(response).not.to.be.an('array');
  })
  it('O retorno dos produtos é um objeto', async () => {
    const response = await productsService.findById(1);    
    expect(response).to.be.an('object');
  })
  it('O retorno não é vazio', async () => {
    const response = await productsService.findById(1);
    expect(response).not.to.be.empty;
    productsModel.findById.restore();
  })
  it('Caso não exista, retorna null', async () => {
    sinon.stub(productsModel, 'findById').resolves(null);
    const response = await productsService.findById(5);
    expect(response).to.be.null;
  })
});