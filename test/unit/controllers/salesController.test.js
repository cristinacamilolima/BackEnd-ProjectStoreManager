const sinon = require('sinon');
const {expect} = require('chai');
const salesService = require('../../../services/saleService');
const salesController = require('../../../controllers/saleController');

describe('Buscando as vendas pelo endpoint /sales', () => {
  const req = {};
  const res = {};

  before(() => {
    req.body = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    const sales = [
      {
        saleId: 1,
        date: '2022-06-21T21:22:00.000Z',
        productId: 1,
        quantity: 99
      }
    ];
    sinon.stub(salesService, 'getAll').resolves(sales);
  })
  after(() => {
    salesService.getAll.restore();
  })

  it('O retorno do status é 200', async () => {
    await salesController.getAllSales(req, res);
    expect(res.status.calledWith(200)).to.be.equal(true);
  })
  it('O retorno do json é um array', async () => {
    await salesController.getAllSales(req, res);
    expect(res.json.calledWith(sinon.match.array)).to.be.equal(true);
  })
});

describe('Buscando as vendas pelo endpoint /sales/:id', () => {
  const req = {};
  const res = {};

  const sales = [
    {
      saleId: 1,
      date: '2022-06-21T21:22:00.000Z',
      productId: 1,
      quantity: 99
    }
  ];

  before(() => {
    req.body = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
  })

  it('O retorno do statusCode é 200', async () => {
    sinon.stub(salesService, 'findById').resolves(sales);
    req.params = {id: 1};
    await salesController.findSaleById(req, res);
    expect(res.status.calledWith(200)).to.be.equal(true);
    salesService.findById.restore();
  })
  it('O retorno do json é um array', async () => {
    sinon.stub(salesService, 'findById').resolves(false);
    req.params = {id: 5};
    await salesController.findSaleById(req, res);
    expect(res.status.calledWith(404)).to.be.equal(true);
    salesService.findById.restore();
  })
});