const User = require('../models/User.js')
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('../lib/jwt.js')
const constants = require('../constants.js')

exports.login = async (email, password) => {

    const user = await User.findOne({ email: email })

    if (user == null) throw new Error('Unable to find such user!');

    if ( bcrypt.compare(password, user.password)) {

        const payload = {

            email,
            _id: user._id
        }
       const token =  await jwt.sign(payload, constants.SECRET, { expiresIn: '3d' });
        
        return token;
    }
    else{

        throw new Error('Passwords do not match!');
    }
}

exports.getAll = async () => {

    return await User.find().lean();
}

exports.create = async (data) => {

    const uuid = uuidv4();

    try {
        const newUser = { _id: uuid, ...data }
        return await User.create(newUser)
    }
    catch (err) {

        throw err;
    }
}

exports.getUser = async (id) => {

    return await User.findById(id).lean()

}

exports.updateUser = async (updated) => {


    await User.updateOne({ _id: updated._id }, {

        $set: {

            firstName: updated.firstName,
            lastName: updated.lastName,
            email: updated.email,
            imageUrl: updated.imageUrl,
            phoneNumber: updated.phoneNumber,
            updatedAt: updated.updatedAt,
            address: updated.address
        }
    })

    return {

        firstName: updated.firstName,
        lastName: updated.lastName,
        email: updated.email,
        imageUrl: updated.imageUrl,
        phoneNumber: updated.phoneNumber,
        updatedAt: updated.updatedAt,
        createdAt:updated.createdAt,
        address: updated.address
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


