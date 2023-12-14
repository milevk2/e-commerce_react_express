export default function jwtParser(jwtToken) {

    const [header, payload, signature] = jwtToken.split('.');
    const decodedPayload = JSON.parse(atob(payload));
    return decodedPayload;
}

