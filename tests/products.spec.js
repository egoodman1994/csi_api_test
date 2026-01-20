import { test, expect } from '@playwright/test';
import { getValidProductId, deleteProductById } from '../utils/apiUtils.js';
import { generateTestProduct } from '../utils/generatedDataUtil.js';

test.describe('Products Page', () => {
    let createdProductId;

    // Get all the products.
    test('get all products', async ({ request }) => {
        const response = await request.get('/products');
        expect(response.status()).toBe(200);
        const products = await response.json();
        expect(Array.isArray(products)).toBe(true);
        expect(products.length).toBeGreaterThan(0);
        expect(products[0]).toHaveProperty('id');
        expect(products[0]).toHaveProperty('title');
        expect(products[0]).toHaveProperty('price');
        expect(products[0]).toHaveProperty('description');
    });

    // Get a single product and show the title, price, and description of the product.
    test('get single product by id', async ({ request }) => {
        // utility to get a validat product id
        const productId = await getValidProductId(request);
        const response = await request.get(`/products/${productId}`);
        expect(response.status()).toBe(200);
        const product = await response.json();
        expect(product.id).toBe(productId);
        expect(product.title).toBeDefined();
        expect(product.price).toBeDefined();
        expect(product.description).toBeDefined();
    });

    // Get all the product categories (woman's clothing, men's clothing, jewelery, electronics)
    test('get all product categories', async ({ request }) => {
        const response = await request.get('/products/categories');
        expect(response.status()).toBe(200);
        const categories = await response.json();
        expect(Array.isArray(categories)).toBe(true);
        expect(categories).toEqual(
            expect.arrayContaining([
                "electronics",
                "jewelery",
                "men's clothing",
                "women's clothing"
            ])
        );
    });

    // Create a new product with a (title, price, description, category)
    test('create a new product', async ({ request }) => {
        const newProduct = await generateTestProduct(request);
        const response = await request.post('/products', {
            data: newProduct
        });
        expect(response.status()).toBe(201);
        const createdProduct = await response.json();
        expect(createdProduct).toHaveProperty('id');
        expect(createdProduct.title).toBe(newProduct.title);
        expect(createdProduct.price).toBe(newProduct.price);
        expect(createdProduct.description).toBe(newProduct.description);
        expect(createdProduct.category).toBe(newProduct.category);
        expect(createdProduct.image).toBe(newProduct.image);
        createdProductId = createdProduct.id;
    });

    // Update a product, and modify the title, price, description, and category.
    test('update a product', async ({ request }) => {
        const updatedProduct = await generateTestProduct(request, createdProductId);
        const response = await request.put(`/products/${createdProductId}`, {
            data: updatedProduct
        });
        expect(response.status()).toBe(200);
        const product = await response.json();
        expect(product.title).toBe(updatedProduct.title);
        expect(product.price).toBe(updatedProduct.price);
        expect(product.description).toBe(updatedProduct.description);
        expect(product.category).toBe(updatedProduct.category);
        expect(product.image).toBe(updatedProduct.image);
    });

test.afterAll(async ({ request }) => {
    // Clean up: delete the created product
    await deleteProductById(request, createdProductId);
});
});