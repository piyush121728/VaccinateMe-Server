const express = require('express');
const admins = require('./models/adminSchema');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({ path: './config.env' });
MONGODB_URI = process.env.PRODUCTION_MONGODB_URI;

mongoose.connect(MONGODB_URI, {
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