const puppeteer = require('puppeteer');
const constants = require('../src/constants.js')
const electonicsService = require('../src/services/electronicsService.js')
const { phonesPaths, phoneData, selectors } = require('./settings.js')
const { wait } = require('../src/lib/util.js')

async function scrape(phoneModel, quantity = null) {

    try {
        const browser = await puppeteer.launch({headless: "new"});
        const page = await browser.newPage();
        const linksArray = await getPhonesArray(phoneModel, page);
        await retrievePhoneData(linksArray, page, quantity);
        await browser.close();
        return 'Database filled successfully!'
    }
    catch (err) {

        console.log(err.message);
        return err.message;
    }

}

async function getPhonesArray(phoneModel, page) {

    const link = `https://www.gsmarena.com/${phonesPaths[phoneModel]}`;
    await page.goto(link);
    const elements = await page.$$('div#review-body div.makers ul li a');

    const linksArray = [];

    for (const element of elements) {
        const link = await page.evaluate(el => el.href, element);
        linksArray.push(link);
    }
    return linksArray;
}

async function retrievePhoneData(linksArray, page, quantity = null) {

    if (quantity == null) quantity = 10; // scrape limit per request set to 10;

    let counter = 0;

    for (link of linksArray) {
        
        if (counter > quantity) return;

        console.log(`Navigating to ${link}`);
        await page.goto(link);

        for (let { selector, property } of selectors) {

            try {
                if (property == 'image') {

                    const elementHandle = await page.waitForSelector(selector, { timeout: 1000 });
                    phoneData[property] = await page.evaluate(element => element.src, elementHandle);
                    continue;
                }
                const elementHandle = await page.waitForSelector(selector, { timeout: 1000 });
                phoneData[property] = await page.evaluate(element => element.textContent, elementHandle);
            }
            catch (err) {
                console.log(err.message)
            }
        }

        phoneData.price = phoneData['price'] += 50;
        phoneData.quantity = phoneData['quantity'] += 5;
        phoneData.ownerId = '5746bbe9-342b-4cc9-ad60-5abafadf8b11'; // milev@abv.bg
        await electonicsService.create(phoneData);
        console.log('Saving ', phoneData.name);
        await wait(5); //wait 5 seconds to be gentle to the server as per robots.txt
        console.log(`Current index ${counter}`);
        counter++;
    }
    return;
}

module.exports = { scrape }

// try {
//     const elementHandle = await page.waitForSelector('h1[data-spec="modelname"]', { timeout: 1000 });
//     phoneData.name = await page.evaluate(element => element.textContent, elementHandle);

// }
// catch (err) {
//     console.log(err.message)
// }
// try {
//     const elementHandle = await page.waitForSelector('td.nfo[data-spec="year"]', { timeout: 1000 });
//     phoneData.announced = await page.evaluate(element => element.textContent, elementHandle);
// }
// catch (err) {
//     console.log(err.message)
// }
// try {
//     const elementHandle = await page.waitForSelector('td.nfo[data-spec="displaysize"]', { timeout: 1000 });
//     phoneData.displaySize = await page.evaluate(element => element.textContent, elementHandle);
// }
// catch (err) {
//     console.log(err.message)
// }
// try {
//     const elementHandle = await page.waitForSelector('div.specs-photo-main a img', { timeout: 1000 });
//     phoneData.image = await page.evaluate(element => element.src, elementHandle);
// }
// catch (err) {
//     console.log(err.message)
// }

// try {
//     const elementHandle = await page.waitForSelector('td.nfo[data-spec="os"]', { timeout: 1000 });
//     phoneData.operating_system = await page.evaluate(element => element.textContent, elementHandle);
// }
// catch (err) {
//     console.log(err.message)
// }
// try {
//     const elementHandle = await page.waitForSelector('td.nfo[data-spec="cpu"]', { timeout: 1000 });
//     phoneData.cpu = await page.evaluate(element => element.textContent, elementHandle);
// }
// catch (err) {
//     console.log(err.message)
// }
// try {
//     const elementHandle = await page.waitForSelector('td.nfo[data-spec="gpu"]', { timeout: 1000 });
//     phoneData.gpu = await page.evaluate(element => element.textContent, elementHandle);
// }
// catch (err) {
//     console.log(err.message)
// }
// try {
//     const elementHandle = await page.waitForSelector('td.nfo[data-spec="internalmemory"]', { timeout: 1000 });
//     const result =  await page.evaluate(element => element.textContent, elementHandle);
//     phoneData.ram = result ;
//     phoneData.storage = result ;
// }
// catch (err) {
//     console.log(err.message)
// }
// phoneData.price = phoneData['price'] += 50;
// try {
//     const elementHandle = await page.waitForSelector('td.nfo[data-spec="batdescription1"]', { timeout: 1000 });
//     phoneData.battery = await page.evaluate(element => element.textContent, elementHandle);
// }
// catch (err) {
//     console.log(err.message)
// }



module.exports = { scrape }