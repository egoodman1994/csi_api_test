async function getValidProductId(request) {
    const response = await request.get('/products');
    const products = await response.json();
    
    if (products.length > 0) {
        return products[0].id;
    }
    
    throw new Error('No products available');
}

export { getValidProductId, deleteProductById, };

async function deleteProductById(request, productId) {
    const response = await request.delete(`/products/${productId}`);
    if (response.status() === 200) {
        return true;
    }
    throw new Error(`Failed to delete product with ID ${productId}`); 
}