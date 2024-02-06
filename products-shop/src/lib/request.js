
async function request(method, url=null, additionalHeaders=null, body=null) {



    const options = {

        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
    }

    if (body !== null) {

        options.body = JSON.stringify(body);
    }

    if(additionalHeaders !== null) {

        options.headers = {...options.headers, ...additionalHeaders};
    }

    try {
        const response =  await fetch(url, options);

        if(!response.ok) console.log('Something went wrong with the response!', response.ok);

        return response;
    }
    catch (err) {
        throw err;
    }
}
export const get = (url, headers)=> request.call(null, 'GET', url, headers );
export const post = (url, headers, body)=> request.call(null, 'POST', url, headers, body);
export const put = (url, headers, body)=> request.call(null, 'PUT', url, headers, body);
export const del  = (url, headers)=> request.call(null, 'DELETE', url, headers);