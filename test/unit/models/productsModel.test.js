const sinon = require('sinon');
const {expect} = require('chai');
const connection = require('../../../models/connection');
const productsModel = require('../../../models/productModel');

describe('Verificando se todos produtos retornam da base de dados', () => {
  before(() => {
    const products = [[
      {
        "id": 1,
        "name": "Martelo de Thor",
        "quantity": 10
      },
      {
        "id": 2,
        "name": "Traje de encolhimento",
        "quantity": 20
      }
    ]];
    sinon.stub(connection, 'execute').resolves(products);
  })
  after(() => {
    connection.execute.restore();
  })

  it('Os dados devem ser retornados em um array', async () => {
    const products = await productsModel.getAllProducts();
    expect(products).to.be.an('array');
  })
  it('O tipo do elemento contido no array deve ser um objeto', async () => {
    const [products] = await productsModel.getAllProducts();
    expect(products).to.be.an('object');
  })
  it('O retorno não é vazio', async () => {
    const [products] = await productsModel.getAllProducts();
    expect(products).not.to.be.empty;
  })
});

describe('Buscando dados pelo Id na base de dados', () => {
  before(() => {
    const products = [[
      {
        "id": 1,
        "name": "Martelo de Thor",
        "quantity": 10
      }
    ]];
    sinon.stub(connection, 'execute').resolves(products);
  })
  after(() => {
    connection.execute.restore();
  })

  it('O retorno dos produtos não é um array', async () => {
    const response = await productsModel.findById(1);
    expect(response).not.to.be.an('array');
  })
  it('O retorno dos produtos é um objeto', async () => {
    const response = await productsModel.findById(1);    
    expect(response).to.be.an('object');
  })
  it('O retorno não é vazio', async () => {
    const response = await productsModel.findById(1);
    expect(response).not.to.be.empty;
  })
});