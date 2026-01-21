import { test, expect } from '@playwright/test';
import { getValiduserId } from '../utils/apiUtils.js';

test.describe('Users Page', () => {
// Get all users
    test('get all users', async ({ request }) => {
        const response = await request.get('/users');
        expect(response.status()).toBe(200);
        const users = await response.json();
        expect(Array.isArray(users)).toBe(true);
        expect(users.length).toBeGreaterThan(0);
        expect(users[0]).toHaveProperty('id');
        expect(users[0]).toHaveProperty('name');
        expect(users[0]).toHaveProperty('email');

    });

// Get a single user and show their ID, first name and last name.
    test('get single user by id', async ({ request }) => {
        const userId = await getValiduserId(request);
        const response = await request.get(`/users/${userId}`);
        expect(response.status()).toBe(200);
        const user = await response.json();
        expect(user.id).toBe(userId);
        expect(user.name.firstname).toBeDefined();
        expect(user.name.lastname).toBeDefined();
        expect(user.email).toBeDefined();
    });

// Get users, but only limit to 5 results.
    test('get users with limit', async ({ request }) => {
        const limit = 5;
        const response = await request.get(`/users?limit=${limit}`);
        expect(response.status()).toBe(200);
        const users = await response.json();
        expect(Array.isArray(users)).toBe(true);
        expect(users.length).toBeLessThanOrEqual(limit);
    });
// Get users, but sort the result in ascending order.
    test('get users sorted ascending', async ({ request }) => {
        const response = await request.get('/users?sort=asc');
        expect(response.status()).toBe(200);
        const users = await response.json();
        expect(Array.isArray(users)).toBe(true);
        for (let i = 1; i < users.length; i++) {
            expect(users[i].id).toBeGreaterThanOrEqual(users[i - 1].id);
        }
    });
});