// Function to get a valid product ID for testing
async function getValidProductId(request) {
    const response = await request.get('/products');
    const products = await response.json();
    
    if (products.length > 0) {
        return products[0].id;
    }
    
    throw new Error('No products available');
}

// Function to delete a product by ID to clean up test data
async function deleteProductById(request, productId) {
    const response = await request.delete(`/products/${productId}`);
    if (response.status() === 200) {
        return true;
    }
    throw new Error(`Failed to delete product with ID ${productId}`); 
}

// Function to get a valid user ID for testing
async function getValiduserId(request) {
    const response = await request.get('/users');
    const users = await response.json();
    
    if (users.length > 0) {
        return users[0].id;
    }
    
    throw new Error('No users available');
}

export { getValidProductId, deleteProductById, getValiduserId };