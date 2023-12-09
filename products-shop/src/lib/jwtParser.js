export default function jwtParser() {

    const jwtToken = localStorage.getItem('authToken')
    const [header, payload, signature] = jwtToken.split('.');
    
    const decodedPayload = JSON.parse(atob(payload));
    

    return decodedPayload;
}

