import * as request from '../lib/request.js'
import {VITE_API_URL} from './host.js'

const baseUrl = `${VITE_API_URL}/products`

async function createProduct(productBody) {

    const response = await request.post(baseUrl, null, productBody);

    if (!response.ok) throw new Error(`Error! ${response.status}`)

    const data = await response.json();

    return data;
}

//if we do not pass an ID - it gets all products, if we pass an ID it gets a certain product by ID.
async function getProduct(id=null, userId=null) {

    let fetchUrl = baseUrl;

    if (id !==null) fetchUrl = `${fetchUrl}/${id}`;
    if (userId !== null) fetchUrl  = `${fetchUrl}/user/${userId}`;

    const response = await request.get(fetchUrl);

    if (!response.ok) throw new Error(`Error! ${response.status}`);

    const data = await response.json();

    return data;
}

async function updateProduct(productId, productBody) {

    const response = await request.put(`${baseUrl}/${productId}`, null, productBody);

    if (!response.ok) throw new Error(`Error! ${response.status}`);

    const data = await response.json();

    return data;
}

async function deleteProduct(productId) {

    const response = await request.del(`${baseUrl}/${productId}`);

    if (!response.ok) throw new Error(`Error! ${response.status}`);

    const data = await response.json();

    return data;
}

export { createProduct, getProduct, updateProduct, deleteProduct }