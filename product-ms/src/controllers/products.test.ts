// const request = require('supertest');
// // import { MongoMemoryServer } from 'mongodb-memory-server';
// // import mongoose from 'mongoose';
// const app =require('../app');
// const Product=  require('../models/product-model'); // Import your Product model


// const product = {
//     id:"testProductId",
//     name: 'Test Product',
//     description: 'A test product',
//     price: 19.99,
//     quantity: 10
// };
// // let mongoServer: MongoMemoryServer;

// // beforeAll(async () => {
// //   mongoServer = new MongoMemoryServer();
// //   const mongoUri = await mongoServer.getUri();
// //   await mongoose.connect(mongoUri, { useNewUrlParser: true });
// // });

// // afterAll(async () => {
// //   await mongoose.disconnect();
// //   await mongoServer.stop();
// // });

// describe('Product Service Endpoints', () => {
//   beforeEach(() => {
//     // Stub the Mongoose model methods
//     jest.spyOn(Product, 'create').mockResolvedValue(product);

//     jest.spyOn(Product, 'find').mockResolvedValue([
//       {
//         _id: 'testProductId',
//         name: 'Test Product',
//         description: 'A test product',
//         price: 19.99,
//         quantity: 10,
//       },
//     ]);

//     jest.spyOn(Product, 'findByIdAndUpdate').mockResolvedValue({
//       _id: 'testProductId',
//       name: 'Updated Product',
//       description: 'An updated product',
//       price: 29.99,
//       quantity: 5,
//     });

//     jest.spyOn(Product, 'findByIdAndRemove').mockResolvedValue({
//       _id: 'testProductId',
//       name: 'Test Product',
//       description: 'A test product',
//       price: 19.99,
//       quantity: 10,
//     });
//   });

//   afterEach(() => {
//     // Restore the original Mongoose methods
//     jest.restoreAllMocks();
//   });

//   it('should create a new product', async () => {
//     const response = await request(app)
//       .post('/products')
//       .send({
//         name: 'Test Product',
//         description: 'A test product',
//         price: 19.99,
//         quantity: 10,
//       });
//     expect(response.status).toBe(201);
//     expect(response.body).toHaveProperty('name', 'Test Product');
//   });

//   it('should get all products', async () => {
//     const response = await request(app).get('/products');
//     expect(response.status).toBe(200);
//     expect(response.body.length).toBeGreaterThan(0);
//   });

//   it('should update a product', async () => {
//     const response = await request(app)
//       .put('/products/testProductId')
//       .send({
//         name: 'Updated Product',
//         description: 'An updated product',
//         price: 29.99,
//         quantity: 5,
//       });
//     expect(response.status).toBe(200);
//     expect(response.body).toHaveProperty('name', 'Updated Product');
//   });

//   it('should delete a product', async () => {
//     const response = await request(app).delete('/products/testProductId');
//     expect(response.status).toBe(200);
//     expect(response.body).toHaveProperty('message', 'Product deleted');
//   });
// });
