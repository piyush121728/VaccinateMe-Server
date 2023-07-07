const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
    email: String
});

const admins = mongoose.model('admins', adminSchema);
module.exports = admins;