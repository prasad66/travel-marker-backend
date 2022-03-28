const router = require('express').Router();
const User = require("../models/User");
const { hashPassword, comparePassword } = require("../utils/utils");

// creating Pins

router.post('/register', async (req, res) => {
    try {
        const hashedPassword = await hashPassword(req.body.password);

        const newUser = await new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        });

        const savedUser = await newUser.save();
        res.status(200).send(savedUser._id);
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
})


router.post("/login", async (req, res) => {
    try {

        const user = await User.findOne({ username: req.body.username });

        if (!user) {
            res.status(400).send("Wrong username or password");
            return;
        }

        const isPasswordValid = await comparePassword(req.body.password, user.password);

        if (!isPasswordValid) { res.status(404).send("Wrong password"); return; }


        res.status(200).json({ id: user._id, username: user.username });
    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router;