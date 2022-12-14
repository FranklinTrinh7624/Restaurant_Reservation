const mongoose = require('mongoose');

const reserveSchema = new mongoose.Schema ({
    username: {type: String, trim: true},
    firstname: {type: String, trim: true},
    lastname: {type: String, trim: true},
    phone: {type: String, required: true, trim: true, minlength: 10},
    email: {type: String, required: true, trim: true},
    date: {type: String, required: true},
    time: {type: String, required: true},
    numGuest: {type: Number, required: true},
    reservedTables: {type: String},
    ccNumber: {type: String},
    ccExpire: {type: String},
    ccv: {type: String},

})

const reservationSchema = mongoose.model("Reservation", reserveSchema);
module.exports = reservationSchema;