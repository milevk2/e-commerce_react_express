
async function request(method, url=null, body=null) {

    const options = {

        method: method,
        headers: {

            'Content-Type': 'application/json'
        },
    }

    if (body !== null) {

        options.body = JSON.stringify(body);
    }

    try {
        const response =  await fetch(url, options);

        return response;
    }
    catch (err) {
        throw err;
    }
}
export const get = (url)=> request.call(null, 'GET', url);
export const post = (url, body)=> request.call(null, 'POST', url, body);
export const put = (url, body)=> request.call(null, 'PUT', url, body);
export const del  = (url)=> request.call(null, 'DELETE', url);