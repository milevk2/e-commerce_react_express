import * as request from '../lib/request.js'

const baseUrl = 'http://localhost:3000/users'




export const create = async (data) => {

    const body = {

        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),

    }

    return await request.post(`${baseUrl}/register`, null, body);
    
}

export const login = async (body) => {

    return await request.post(`${baseUrl}/login`, null, body);

}

export const logout = async (token) => {

    return await request.post(`${baseUrl}/logout`, null, {authToken: token});

}


// export const getAll = async () => {

//     try {
//         const response = await fetch(`${baseUrl}`)
//         const data = await response.json();


//         return Object.values(data);
//     }
//     catch (err) {

//         console.log(err);
//     }

// }

// export const getOne = async (id) => {

//     const request = await request.get()
//     const response = await request.json();

//     return response;
// }

// export const deleteUser = async (id) => {

//     const request = await fetch(`${baseUrl}/${id}`, {

//         method: 'DELETE',

//         headers: {

//             'Content-Type': 'application/json',
//         }

//     })
//     const response = await request.json();

//     return response;
// }

// export const editUser = async(id, data, createdAt) => {

//     const {firstName, lastName, email, phoneNumber, imageUrl} = data;

//     const address = {

//         country: data.country,
//         city: data.city,
//         street: data.street,
//         streetNumber: data.streetNumber

//     }

//     const updatedBody = {firstName, lastName, email, phoneNumber, imageUrl, createdAt, updatedAt: new Date().toISOString(), address}

//     console.log(`${JSON.stringify(updatedBody)} thiss is edited data!`);

//     const request = await fetch(`${baseUrl}/${id}`, {

//         method: 'PUT',

//         headers: {

//             'Content-Type': 'application/json',
//         },

//         body: JSON.stringify(updatedBody)

//     })
//     const response = await request.json();

//     return response;

// }
