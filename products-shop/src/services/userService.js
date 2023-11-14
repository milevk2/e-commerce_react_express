const baseUrl = 'http://localhost:3000/jsonstore/users';

export const getAll = async () => {

    try {
        const response = await fetch(`${baseUrl}`)
        const data = await response.json();


        return Object.values(data);
    }
    catch (err) {

        console.log(err);
    }

}

export const getOne = async (id) => {

    const request = await fetch(`${baseUrl}/${id}`)
    const response = await request.json();

    return response;
}


export const create = async (data) => {

    const body = {

        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        imageUrl: data.imageUrl,
        phoneNumber: data.phoneNumber,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        address: {

            country: data.country,
            city: data.city,
            street: data.street,
            streetNumber: data.streetNumber
        }
    }

    return fetch(baseUrl, {

        method: 'POST',

        headers: {

            'Content-Type': 'application/json',

        },

        body: JSON.stringify(body)

    })//.then(response => response.json()).then(result => result).catch(err => console.log(err));
}

export const deleteUser = async (id) => {

    const request = await fetch(`${baseUrl}/${id}`, {

        method: 'DELETE',

        headers: {

            'Content-Type': 'application/json',
        }

    })
    const response = await request.json();

    return response;
}

export const editUser = async(id, data, createdAt) => {

    const {firstName, lastName, email, phoneNumber, imageUrl} = data;

    const address = {

        country: data.country,
        city: data.city,
        street: data.street,
        streetNumber: data.streetNumber

    }

    const updatedBody = {firstName, lastName, email, phoneNumber, imageUrl, createdAt, updatedAt: new Date().toISOString(), address}

    console.log(`${JSON.stringify(updatedBody)} thiss is edited data!`);

    const request = await fetch(`${baseUrl}/${id}`, {

        method: 'PUT',

        headers: {

            'Content-Type': 'application/json',
        },

        body: JSON.stringify(updatedBody)

    })
    const response = await request.json();

    return response;

}
