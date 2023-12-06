const mongoose = require('mongoose');
// ⦁	name – string (required)
// ⦁	type – string (required)
// ⦁	damages – string (required)
// ⦁	image - string (required)
// ⦁	description – string (required)
// ⦁	production – number (required)
// ⦁	exploitation - number (required)
// ⦁	price - number (required)
// ⦁	buyingList – an array of objects containing the users' ID
// ⦁	owner – object ID (a reference to the User model)

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
    announced:{ 
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
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },

});


const Electronics = mongoose.model("Electronics", electronicsSchema);
module.exports = Electronics;