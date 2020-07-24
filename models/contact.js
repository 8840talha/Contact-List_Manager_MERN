const mongoose = require('mongoose')

const ContactSchema = new mongoose.Schema({

    name: {
        type: String,
        trim: true,
        required: [true, 'Please add a name'],
        maxlength: 32
    },
    mobilenumber: {
        type: Number,
        unique: true,
        required: [true, ' Please add an Number'],
        minlength: 10,
        maxlength: 10

    },


}, { timestamps: true })

module.exports = mongoose.model('Contact', ContactSchema);
