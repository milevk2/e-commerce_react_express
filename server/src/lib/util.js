function wait(seconds) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(`Waiting ${seconds} seconds`);
            resolve();
        }, seconds * 1000);
    });
}

module.exports = {wait}