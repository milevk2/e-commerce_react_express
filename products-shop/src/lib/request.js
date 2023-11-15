
async function request(method, url, body=null) {


    const options = {

        method: method,
        headers: {

            'Content-Type': 'application/json'
        },
    }

    if (body !== null) {

        options.body = JSON.stringify(body)

    }

    try {
        const request =  await fetch(url, options);

        return request;
    }
    catch (err) {
        throw err;
    }

}

export const get = request.bind(null, 'GET');
export const post = (url, body)=> request.bind(null, 'POST', url, body)

