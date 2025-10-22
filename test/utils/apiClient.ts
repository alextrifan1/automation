import axios, { AxiosResponse } from 'axios';

const BASE_URL = process.env.BASE_API_URL || 'https://fakestoreapi.com';

export const apiClient = {
  async get(endpoint: string): Promise<AxiosResponse> {
    return axios.get(`${BASE_URL}${endpoint}`);
  },

  async post(endpoint: string, body: object): Promise<AxiosResponse> {
    return axios.post(`${BASE_URL}${endpoint}`, body);
  },
  async put(endpoint: string, body: object): Promise<AxiosResponse> {
    return axios.put(`${BASE_URL}${endpoint}`, body);
  },
  async delete(endpoint: string): Promise<AxiosResponse> {
    return axios.delete(`${BASE_URL}${endpoint}`);
  },
};
