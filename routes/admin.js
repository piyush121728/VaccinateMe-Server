const router = require('express').Router();
const covidCentres = require('../models/covidCentreSchema');
const admins = require('../models/adminSchema');

const uid = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(0, 10);
}

router.post('/verifyadmin', async (req, res) => {
    try {
        const { email } = req.body;
        const doc = await admins.findOne({ email }).lean();
        console.log(doc, email);
        if (doc)
            return res.status(200).json({ success: true, msg: 'Admin Successfully verified' });
        return res.status(400).json({ msg: "Not a Admin" });
    } catch (err) {
        return res.status(500).json({ errMsg: "Server is Unavailable" });
    }
});

router.get('/allcentres', async (req, res) => {
    try {
        const centres = await covidCentres.find().limit(20).lean();
        if (centres.length) {
            for (let centre of centres) {
                delete centre._id;
                delete centre.__v;
            }
            return res.status(200).json(centres);

        } else {
            return res.status(200).json({
                msg: "Sorry there are no centres to fetch."
            })
        }
    } catch (err) {
        return res.status(500).json({ errMsg: "Server is Unavailable" });
    }
});

router.post('/createcentre', async (req, res) => {
    let newCentreData = req.body;
    newCentreData = { ...newCentreData, dose_available: 10, center_id: uid()};

    try {
        const doc = await covidCentres.create(newCentreData);
        console.log(doc);
        return res.status(200).json({ success: true, msg: 'Data successfully submitted' });
    } catch (err) {
        return res.status(500).json({ errMsg: "Server is Unavailable" });
    }
});

router.post('/deletecentre', async (req, res) => {
    const { center_id } = req.body;
    try {
        await covidCentres.findOneAndDelete({ center_id });
        return res.status(200).send({ success: true });
    } catch (err) {
        return res.status(500).json({ errMsg: "Server is Unavailable" });
    }
});

module.exports = router;