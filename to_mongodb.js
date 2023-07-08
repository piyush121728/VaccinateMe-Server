const express = require('express');
const app = express();
const mongoose = require('mongoose');
const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
MONGODB_URI = process.env.PRODUCTION_MONGODB_URI

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connection Successful to database")
}).catch((err) => {
    console.log('Database Not Connected ====> \n ', err);
});

mongoose.set('strictQuery', true);  // new version warnings

app.use(express.json());

const covidSchema = require('./models/covidCentreSchema');
const sampleData = JSON.parse(fs.readFileSync('./dummy_data.json', 'utf-8'));

const uploadData = async () => {
    try {
        await covidSchema.create(sampleData);
        console.log("Successfully uploaded");
        process.exit();
    } catch (err) {
        console.log(`error during upload ==> \n ${err}`);
    };
};

uploadData();

app.listen(3000, () => {
    console.log('Server running');
});