const sinon = require('sinon');
const {expect} = require('chai');
const connection = require('../../../models/connection');
const salesModel = require('../../../models/saleModel');

describe('Buscando todas as vendas', () => {
  before(() => {
    const sales = [[
      {
        saleId: 1,
        date: '2022-06-21T21:22:00.000Z',
        productId: 1,
        quantity: 99
      }
    ]];
    sinon.stub(connection, 'execute').resolves(sales);
  })
  after(() => {
    connection.execute.restore();
  })

  it('O retorno das vendas é um array', async () => {
    const sale = await salesModel.getAllSales();
    expect(sale).to.be.an('array');
  })
  it('O retorno das vendas é um objeto', async () => {
    const [sale] = await salesModel.getAllSales();
    expect(sale).to.be.an('object');
  })
  it('O retorno não é vazio', async () => {
    const [sale] = await salesModel.getAllSales();
    expect(sale).not.to.be.empty;
  })
});

describe('Buscando vendas por Id', () => {
    before(() => {
      const sales = [[
        {
          saleId: 1,
          date: '2022-06-21T21:22:00.000Z',
          productId: 1,
          quantity: 99
        }
      ]];
      sinon.stub(connection, 'execute').resolves(sales);
    })
    after(() => {
      connection.execute.restore();
    })

    it('O retorno dos produtos é um array', async () => {
      const sale = await salesModel.findById(1);
      expect(sale).to.be.an('array');
    })
    it('O retorno dos produtos é um objeto', async () => {
      const [sale] = await salesModel.findById(1);
      expect(sale).to.be.an('object');
    })
    it('O retorno não é vazio', async () => {
      const [sale] = await salesModel.findById(1);
      expect(sale).not.to.be.empty;
    })
  });

  describe('Criando um produto na base de dados', () => {

    before(() => {
      const sale = [{ 
        saleId: 1
      }]
  
      sinon.stub(connection, 'execute').resolves(sale);
    })
    after(() => {
      connection.execute.restore();
    })
  
    it('Deve ser criado um identificador de venda', async () => {
      const sale = await salesModel.createSale()      
      expect(sale).to.have.property('saleId');    
    })
  });