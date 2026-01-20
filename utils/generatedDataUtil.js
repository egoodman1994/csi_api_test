// filepath: /Users/ericgoodman/repo/csi_api_test/utils/generatedDataUtil.js

const PRODUCT_CATEGORIES = ["electronics", "jewelery", "men's clothing", "women's clothing"];

const PRODUCT_NAMES = [
    "Phone Charger",
    "Laptop Charger",
    "USB-C Cable",
    "Button Up Shirt",
    "Blue Jeans",
    "Watch",
    "Silver Necklace"
];

const PRODUCT_DESCRIPTIONS = [
    "High quality and durable product",
    "Perfect for everyday use",
    "Premium design with excellent performance",
    "Reliable and cost-effective solution",
    "Latest technology with modern features"
];

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

    // Generate random product data
    const randomName = PRODUCT_NAMES[Math.floor(Math.random() * PRODUCT_NAMES.length)];
    const randomDescription = PRODUCT_DESCRIPTIONS[Math.floor(Math.random() * PRODUCT_DESCRIPTIONS.length)];
    const randomCategory = PRODUCT_CATEGORIES[Math.floor(Math.random() * PRODUCT_CATEGORIES.length)];
    const randomPrice = parseFloat((Math.random() * 100 + 10).toFixed(2));

    const product = {
        id: productId,
        title: randomName,
        price: randomPrice,
        description: randomDescription,
        category: randomCategory,
        image: "http:example.com"
    };
    return product;
}

export { generateTestProduct };