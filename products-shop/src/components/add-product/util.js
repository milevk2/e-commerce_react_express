
export function testSetErrors(targetValue, callback) {

    const regExp = /^[0-9]+$/;
    if (!regExp.test(targetValue) && targetValue !== '') {
        return callback(true);
    }
    return callback(false);
}



