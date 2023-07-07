const express = require('express');
const admins = require('./models/adminSchema');
const mongoose = require('mongoose');

mongoose.connect("mongodb://0.0.0.0:27017/covid", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connection Successful to database")
}).catch((err) => {
    console.log('Database Not Connected ====> \n ', err);
});

const app = express();

mongoose.set('strictQuery', true);

const sampleData = [{ email: '200305105166@paruluniversity.ac.in' }];

const uploadAdminData = async () => {
    try {
        await admins.create(sampleData);
        console.log("Successfully uploaded");
        process.exit();
    } catch (err) {
        console.log(`error during upload ==> \n ${err}`);
    };
};

uploadAdminData();

app.listen(3000, () => {
    console.log('Server running');
});