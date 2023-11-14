function serverLogger(req, res, next) {
    
    const time = new Date();
    console.log(`<[Date: ${time.getFullYear()}/${String(time.getMonth() + 1).padStart(2,'0')}/${String(time.getDate()).padStart(2,'0')} Time: ${String(time.getHours()).padStart(2,'0')}:${String(time.getMinutes()).padStart(2,'0')}:${String(time.getSeconds()).padStart(2,'0')}]> ${req.method} ${req.url}`);
    next();
}

module.exports = {serverLogger}