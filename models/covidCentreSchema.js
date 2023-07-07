const mongoose = require('mongoose');

const covidCentreSchema = mongoose.Schema({
    center_id: String,
    center_name: String,
    center_address: String,
    vaccine: String,
    age: String,
    dose_available: Number,
    pincode: Number
});

const covidCentres = mongoose.model('covidcentre', covidCentreSchema);
module.exports = covidCentres;