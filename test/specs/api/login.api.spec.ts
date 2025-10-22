import { expect } from '@wdio/globals';
import { apiClient } from '../../utils/apiClient';

describe('Fake Store API Tests', () => {
  it('should login successfully with valid credentials', async () => {
    const response = await apiClient.post(`/auth/login`, {
      username: 'johnd',
      password: 'm38rmF$',
    });
    expect(response.status).toBe(201);
    expect(response.data).toHaveProperty('token');
  });

  it('should create a new user', async () => {
    const response = await apiClient.post(`/users`, {
      email: 'test@example.com',
      username: 'testuser',
      password: 'Test@1234',
      name: {
        firstname: 'Test',
        lastname: 'User',
      },
      address: {
        city: 'TestCity',
        street: '123 Test St',
        number: 1,
        zipcode: '12345-6789',
        geolocation: {
          lat: '0.0000',
          long: '0.0000',
        },
        phone: '123-456-7890',
      },
    });
    expect(response.status).toBe(201);
    expect(response.data).toHaveProperty('id');
  });
});
