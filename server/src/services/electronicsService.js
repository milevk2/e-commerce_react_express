
const Electronics = require('../models/Electronics.js')


exports.create = async (data) => {

    try {
        return await Electronics.create(data);
    }
    catch (err) {

        throw err;
    }
}

exports.getAll = async () => {

    try {
        return await Electronics.find().lean();

    }
    catch (err) {

        console.log('Service error :', err);

    }
}

exports.getOne = async (identifier) => {

    try {
        return await Electronics.findOne({ _id: identifier }).lean();
    }
    catch (err) {

        return 'No such product found!'
    }
}

exports.buy = async (productId, buyer) => {

    try {
        const document = await Electronics.findOne({ _id: productId });

        document.buyingList.push(buyer);
        await document.save();

    }
    catch (err) {

        return 'No such product found!'
    }
}

exports.updateOne = async (data) => {

    try {
       return await Electronics.findOneAndUpdate({ _id: data._id }, data, { new: true })
    }
    catch (err) {

        console.log(err);
    }
}

exports.deleteOne = async (identifier) => {

    try {
        await Electronics.deleteOne({ _id: identifier })
    }
    catch (err) {

        console.log(err);
    }


}
exports.search = async (name, type) => {

    const criteria1 = { name };
    const criteria2 = { type };

    console.log(criteria1, criteria2);

    try {

        return await Electronics.find({ $and: [criteria1, criteria2] }).lean();

    }
    catch (err) {

        console.log(err);
        throw err;
    }
}

