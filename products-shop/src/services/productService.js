import * as request from '../lib/request.js'

const baseUrl = 'http://localhost:3000'

async function createProduct(product) {

    const response = await request.post(`${baseUrl}/products`, product);

    if (!response.ok) throw new Error(`Error! ${response.status}`)

    const result = await response.json();

    return result;

}

export {createProduct}