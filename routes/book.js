const router = require('express').Router();
const covidCentres = require('../models/covidCentreSchema');

router.post('/bookcentre', async (req, res) => {
    let { center_id, dose_available } = req.body;
    try {

        let doc = await covidCentres.findOne({ center_id }).lean();
        if (doc.dose_available <= 0)
            return res.status(204).json({ msg: 'No slot available', success: false });

        await covidCentres.findOneAndUpdate({ center_id }, {
            $inc: { dose_available: -1 }
        });

        return res.status(200).json({ msg: "Booking Confirmed", success: true });
    } catch (err) {
        console.log(err, 'error')
        return res.status(500).json({ errMsg: "Server is Unavailable" });
    }
});

module.exports = router;