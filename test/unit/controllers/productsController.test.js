const sinon = require('sinon');
const {expect} = require('chai');
const productsService = require('../../../services/productService');
const productsController = require('../../../controllers/productController');


describe('Buscando pelos produtos no endpoint /products', () => {
    const req = {};
    const res = {};
  
    before(() => {
      req.body = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();      
      const products = [
        {
          "id": 1,
          "name": "Martelo de Thor",
          "quantity": 10
        }
      ];

      sinon.stub(productsService, 'getAll').resolves(products);      
    })
    after(() => {
      productsService.getAll.restore();      
    })
  
    it('A requisição deve retornar o statusCode 200', async () => {
      await productsController.getAllProducts(req, res);
      expect(res.status.calledWith(200)).to.be.equal(true);
    })
    it('A requisição deve retornar os produtos em um array', async () => {
      await productsController.getAllProducts(req, res);
      expect(res.json.calledWith(sinon.match.array)).to.be.equal(true);
    })
  });
  
  describe('Buscando pelos produtos no endpoint  /products/:id', () => {
    const req = {};
    const res = {};
  
    const products = [
      {
        "id": 1,
        "name": "Martelo de Thor",
        "quantity": 10
      }
    ];
  
    before(() => {
      req.body = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
    })
    
    it('A requisição deve retornar o statusCode 200', async () => {
      sinon.stub(productsService, 'findById').resolves(products);
      req.params = {id: 1};
      await productsController.findProductById(req, res);
      expect(res.status.calledWith(200)).to.be.equal(true);
      productsService.findById.restore();
    })
    it('A requisição deve retornar o statusCode 404', async () => {
      sinon.stub(productsService, 'findById').resolves(false);
      req.params = {id: 2};
      await productsController.findProductById(req, res);
      expect(res.status.calledWith(404)).to.be.equal(true);
      productsService.findById.restore();
    })
  });

  describe('Criando produtos no endpoint /products', () => {
    const req = {};
    const res = {};
  
    before(() => {
      req.body = {
        "name": "Martelo de Thor",
        "quantity": 5
      };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      const productCreated = {
        "id": 4,
        "name": "Martelo de Thor",
        "quantity": 5
      }      
      sinon.stub(productsService, 'create').resolves(productCreated);
    })
    after(() => {      
      productsService.create.restore();      
    })

    it('Um produto deve ser criado', async () => {
      await productsController.createProduct(req, res);
      expect(res.status.calledWith(201)).to.be.equal(true);
    })
    it('Deve existir uma propriedade chamada id no retorno da requisição', async () => {
      await productsController.createProduct(req, res);      
      expect(res.json).to.have.property('id');      
    })
  });