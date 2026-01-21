import { faker } from '@faker-js/faker';


async function generateTestProduct(request, id = null) {
    // Get all existing product IDs
    const response = await request.get('/products');
    const products = await response.json();
    const existingIds = new Set(products.map(p => p.id));

    // Use provided ID if available, otherwise generate a random ID not currently in use
    let productId = id !== null ? id : null;
    if (productId === null) {
        do {
            productId = Math.floor(Math.random() * 1000) + 1;
        } while (existingIds.has(productId));
    } else if (existingIds.has(productId)) {
        throw new Error('Provided ID already exists');
    }

    // Generate random category
    const PRODUCT_CATEGORIES = ["electronics", "jewelery", "men's clothing", "women's clothing"];
    const randomCategory = PRODUCT_CATEGORIES[Math.floor(Math.random() * PRODUCT_CATEGORIES.length)];

    const product = {
        id: productId,
        title: faker.commerce.productName(),
        price: faker.commerce.price({ min: 1, max: 200 }),
        description: faker.commerce.productDescription() ,
        category: randomCategory,
        image: "http:example.com"
    };
    return product;
}

export { generateTestProduct };