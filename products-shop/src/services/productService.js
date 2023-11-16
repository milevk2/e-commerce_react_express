import * as request from '../lib/request.js'

const baseUrl = 'http://localhost:3000/products'

async function createProduct(productBody) {

    const response = await request.post(baseUrl, productBody);

    if (!response.ok) throw new Error(`Error! ${response.status}`)

    const result = await response.json();

    return result;
}

async function getAllProducts() {

    const response = await request.get(baseUrl);

    if (!response.ok) throw new Error(`Error! ${response.status}`)

    const data = await response.json();
    
    return data;
}

export { createProduct, getAllProducts }