const mongoose = require('mongoose');

const userInfoSchema = new mongoose.Schema ({
    username: {type: String, required: true, trim: true, minlength: 8},
    firstname: {type: String, required: true, trim: true},
    lastname: {type: String, required: true, trim: true},
    mailingAdd: {type: String, required: true, trim: true},
    billingAdd: {type: String, required: true, trim: true},
    dinerNumber: {type: Number, required: true},
    earnedPoints: {type: Number}, 
    preferPayment: {type: String, required: true},


});

const userInformation = mongoose.model("Userinfo", userInfoSchema);
module.exports = userInformation;