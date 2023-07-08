const express = require('express');
const cron = require('node-cron');
const covidCentres = require('./models/covidCentreSchema');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
require('./config/Database');

const PORT = process.env.PORT || 80;

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors(require('./config/corsConfig')));

app.get('/', (req, res) => {
    res.status(200).send('Congrats your are now connected to covid 19 server');
});

app.post('/searchcentre', async (req, res) => {
    let { pincode } = req.body;
    try {
        const centres = await covidCentres.find({ pincode }).limit(20).lean();

        if (centres.length) {
            for (let centre of centres) {
                delete centre._id;
                delete centre.__v;
            }
            return res.status(200).json(centres);

        } else {
            return res.status(200).json({
                msg: "Sorry any centre with this pincode is not found in our database!!!."
            })
        }
    } catch (err) {
        return res.status(400).json({ errMsg: "Server is Unavailable" });
    }
});


app.use('/', require('./routes/book'));
app.use('/admin', require('./routes/admin'));

// Cron Task

const runTask = async () => {
    try {
        await covidCentres.updateMany({ dose_available: { $lt: 10 } }, { $set: { dose_available: 10 } });
    } catch (err) {
        console.log('Cron Job failed with following error ==> ', err);
    }
};

cron.schedule('59 59 23 * * *', () => {
    runTask();
});

app.listen(PORT, () => {
    console.log("Server is running");
})