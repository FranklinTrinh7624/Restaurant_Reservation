const mongoose = require('mongoose');

const userSchema = new mongoose.Schema ({
    username: {type: String, required: true, trim: true, minlength: 8},
    password: {type: String, required: true, trim: true, minlength: 8},
});

const Users = mongoose.model("User", userSchema);
module.exports = Users;