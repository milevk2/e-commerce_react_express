const mongoose = require('mongoose');

const userCommentsSchema = new mongoose.Schema({
    content: String,
    userName: String,
    user_id: String,
    time: String,
    rating: Number
});

const electronicsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    announced: {
        type: String,
        required: true
    },
    displaySize: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    operating_system: {
        type: String,
        required: true
    },
    cpu: {
        type: String,
        required: true
    },
    gpu: {
        type: String,
        required: true
    },
    ram: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    battery: {
        type: String,
        required: true
    },
    quantity: {
        type: String,
        required: true
    },

    storage: {
        type: String,
        required: true
    },

    category: {

        type: String,
        required: true

    },

    comments: [userCommentsSchema],

    ownerId: {
        type: String,
        required: true
    },

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
});

const Electronics = mongoose.model("Electronics", electronicsSchema);
module.exports = { electronicsSchema, Electronics };
