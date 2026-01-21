import { defineConfig } from '@playwright/test';
export default defineConfig({
  use: {
    baseURL: 'https://fakestoreapi.com',
    extraHTTPHeaders: {
      'Accept': 'application/json',
    },
  }
});
