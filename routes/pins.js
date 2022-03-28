const router = require('express').Router();
const Pin = require("../models/Pin");

// creating Pins

router.post("/", async (req, res) => {
    const newPin = await new Pin(req.body);
    try {
        const savedPin = await newPin.save();
        res.status(200).send(savedPin);
    } catch (error) {
        res.status(500).json(error);
    }
});


// get pins
router.get("/", async (req, res) => {
    try {
        const pins = await Pin.find();
        res.status(200).send(pins);
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;