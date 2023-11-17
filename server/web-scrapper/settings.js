const phonesPaths = {

    samsung: 'samsung-phones-9.php',
    xiaomi: 'xiaomi-phones-80.php',
    nokia: 'nokia-phones-1.php'

}

const selectors = [
    { selector: 'h1[data-spec="modelname"]', property: 'name' },
    { selector: 'td.nfo[data-spec="year"]', property: 'announced' },
    { selector: 'td.nfo[data-spec="displaysize"]', property: 'displaySize' },
    { selector: 'div.specs-photo-main a img', property: 'image', attribute: 'src' },
    { selector: 'td.nfo[data-spec="os"]', property: 'operating_system' },
    { selector: 'td.nfo[data-spec="cpu"]', property: 'cpu' },
    { selector: 'td.nfo[data-spec="gpu"]', property: 'gpu' },
    { selector: 'td.nfo[data-spec="internalmemory"]', property: 'ram', storageProperty: 'storage' },
    { selector: 'td.nfo[data-spec="batdescription1"]', property: 'battery' }
];

const phoneData = {
    name: 'default',
    announced: 'default',
    displaySize: 'default',
    image: 'default',
    description: 'default',
    operating_system: 'default',
    cpu: 'default',
    gpu: 'default',
    ram: 'default',
    price: 599.99,
    battery: 'default',
    quantity: 5,
    storage: 'default',
    category: 'default',
    comments: [
        { username: 'Stefan', comment: 'Great product!' },
        { username: 'Georgi', comment: 'I love it!' },
    ]
};


module.exports = {phonesPaths, selectors, phoneData}