const mongoose = require('mongoose');

const reserveSchema = new mongoose.Schema ({
    username: {type: String, required: true, trim: true, minlength: 8},
    firstname: {type: String, required: true, trim: true},
    lastname: {type: String, required: true, trim: true},
    phone: {type: String, required: true, trim: true, minlength: 10},
    email: {type: String, required: true, trim: true},
    date: {type: Date, required: true},
    numGuest: {type: Number, required: true},

})

const reservationSchema = mongoose.model("Reservation", reserveSchema);
module.exports = reservationSchema;