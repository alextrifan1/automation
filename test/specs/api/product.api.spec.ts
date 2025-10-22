import { expect } from '@wdio/globals';
import { apiClient } from '../../utils/apiClient';

describe('Fake Store API Tests', () => {
  it('should fetch all products', async () => {
    const response = await apiClient.get('/products');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.data)).toBe(true);
    expect(response.data.length).toBeGreaterThan(0);
  });

  it('should fetch a single product by ID', async () => {
    const response = await apiClient.get('/products/1');
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('id', 1);
  });

  it('should create a new product', async () => {
    const newProduct = {
      title: 'Test Product',
      price: 15.99,
      description: 'A product created during an API test',
      image: 'https://i.pravatar.cc',
      category: 'electronics',
    };

    const response = await apiClient.post('/products', newProduct);
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('title', newProduct.title);
  });

  it('should handle invalid product ID', async () => {
    try {
      await apiClient.get('/products/99999');
    } catch (error: any) {
      expect(error.response.status).toBe(404);
    }
  });
});
