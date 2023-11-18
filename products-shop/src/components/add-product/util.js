
export function testSetErrors(targetValue, callback) {

    const regExp = /^\d+(\.\d{1,2})?$/
    if (!regExp.test(targetValue) && targetValue !== '') {
        return callback(true);
    }
    return callback(false);
}



