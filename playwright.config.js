import { defineConfig } from '@playwright/test';
export default defineConfig({
  use: {
    // All requests we send go to this API endpoint.
    baseURL: 'https://fakestoreapi.com',
    extraHTTPHeaders: {
      'Accept': 'application/json',
      // 'Authorization': `token ${process.env.API_TOKEN}`,
    },
  }
});