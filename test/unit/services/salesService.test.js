const sinon = require('sinon');
const {expect} = require('chai');
const salesModel = require('../../../models/saleModel')
const salesService = require('../../../services/saleService');

describe('Buscando todas as vendas', () => {
  before(() => {
    const sales = [
      {
        saleId: 1,
        date: '2022-06-21T21:22:00.000Z',
        productId: 1,
        quantity: 99
      }
    ];
    sinon.stub(salesModel, 'getAllSales').resolves(sales);
  })
  after(() => {
    salesModel.getAllSales.restore();
  })

  it('O retorno das vendas é um array', async () => {
    const sale = await salesService.getAll();
    expect(sale).to.be.an('array');
  })
  it('O retorno das vendas é um objeto', async () => {
    const [sale] = await salesService.getAll();
    expect(sale).to.be.an('object');
  })
  it('O retorno não é vazio', async () => {
    const [sale] = await salesService.getAll();
    expect(sale).not.to.be.empty;
  })
});

describe('Buscando vendas pelo Id', () => {
  before(() => {
    const sales = [
      {
        saleId: 1,
        date: '2022-06-21T21:22:00.000Z',
        productId: 1,
        quantity: 99
      }
    ];
    sinon.stub(salesModel, 'findById').resolves(sales);
  })
  after(() => {
    salesModel.findById.restore();
  })

  it('O retorno das vendas é um array', async () => {
    const sale = await salesService.findById(1);
    expect(sale).to.be.an('array');
  })
  it('O retorno das vendas é um objeto', async () => {
    const [sale] = await salesService.findById(1);
    expect(sale).to.be.an('object');
  })
  it('O retorno não é vazio', async () => {
    const sale = await salesService.findById(1);
    expect(sale).not.to.be.empty;
    salesModel.findById.restore();
  })
  it('Caso não exista, retorna null', async () => {
    sinon.stub(salesModel, 'findById').resolves(null);
    const sale = await salesService.findById(5);
    expect(sale).to.be.null;    
  })
});