const mongoose = require('mongoose');

const userSchema = new mongoose.Schema ({
    username: {type: String, required: true, trim: true, minlength: 8},
    password: {type: String, required: true, trim: true, minlength: 8},
    // fname: {type: String, required: true, trim: true},
    // lname: {type: String, required: true, trim: true},
    // mailAdd: {type: String, required: true, trim: true},
    // billAdd: {type: String, required: true, trim: true},
});

const Users = mongoose.model("User", userSchema);
module.exports = Users;