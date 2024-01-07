const request = require('supertest');
const {app, server} = require('../index');
const { Task } = require('../models/models');

jest.mock('../models/models', () => ({
    Task: {
      find: jest.fn().mockResolvedValue([]),
    }
  }));
  
describe('API Tests', () => {
    afterAll(done => {
        server.close(done);
    });
    it('should fetch all tasks', async () => {
        const response = await request(app).get('/tasks');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual([]);
        expect(Task.find).toHaveBeenCalled();
    });
});



  