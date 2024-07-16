import { jest } from '@jest/globals';
import { getUsers } from '../../../src/controllers/userController.js';

describe('User Controller', () => {
  test('getUsers should return an array of users', async () => {
    const mockRequest = {};
    const mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    await getUsers(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(expect.arrayContaining([
      expect.objectContaining({
        id: expect.any(Number),
        name: expect.any(String),
      })
    ]));
  });
});