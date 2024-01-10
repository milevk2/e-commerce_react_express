const User = require('../models/User.js')
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('../lib/jwt.js')
const constants = require('../constants.js')

exports.login = async (email, password) => {

    const user = await User.findOne({ email: email })

    if (!user) throw new Error('Unable to find such user!');

    const compare = await bcrypt.compare(password, user.password)

    if (compare) {

        const payload = {

            email,
            _id: user._id,
            userName: user.userName,
        }
        const token = await jwt.sign(payload, constants.SECRET, { expiresIn: '3d' });
        const cart = user.cart;

        return {token, cart};
    }
    else {

        throw new Error('Passwords do not match!');
    }
}

exports.getAll = async () => {

    return await User.find().lean();
}

exports.create = async (data) => {

    const uuid = uuidv4();

    try {
        const newUser = { _id: uuid, ...data, cart: [] }
        return await User.create(newUser)
    }
    catch (err) {

        throw err;
    }
}

exports.getUser = async (id) => {

    return await User.findById(id).lean()

}

exports.updateUser = async (userId, newCart) => {
    try {
        const result = await User.updateOne({ _id: userId }, {
            $set: {
                cart: newCart
            }
        })

        if (result.nModified === 1) {

            return `${userId}'s cart updated!`;
        } else {

            return `User with ID ${userId} not found or cart not updated!`;
        }
    }
    catch (err) {

        console.log(err);
    }
}

exports.deleteUser = async (id) => {

    try {
        const deletedDoc = await User.findByIdAndRemove(id);

        if (deletedDoc) {
            console.log('Document deleted successfully:', deletedDoc);
        } else {
            console.log('No matching document found to delete.');
        }
    } catch (err) {
        console.error('Error deleting document:', err);
    }
}


