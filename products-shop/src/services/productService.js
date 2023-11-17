import * as request from '../lib/request.js'

const baseUrl = 'http://localhost:3000/products'

async function createProduct(productBody) {

    const response = await request.post(baseUrl, productBody);

    if (!response.ok) throw new Error(`Error! ${response.status}`)

    const data = await response.json();

    return data;
}

//if we do not pass an ID - it gets all products, if we pass an ID it gets a certain product by ID.
async function getProduct(id=null) {

    let fetchUrl = baseUrl;

    if (id !==null) fetchUrl = `${fetchUrl}/${id}`

    const response = await request.get(fetchUrl);

    if (!response.ok) throw new Error(`Error! ${response.status}`)

    const data = await response.json();

    return data;
}

export { createProduct, getProduct }