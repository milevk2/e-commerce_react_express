export default function jwtParser() {

    if (!localStorage.getItem('authToken')) return null;
    const jwtToken = localStorage.getItem('authToken');
    const [header, payload, signature] = jwtToken.split('.');
    const decodedPayload = JSON.parse(atob(payload));
    return decodedPayload;
}

