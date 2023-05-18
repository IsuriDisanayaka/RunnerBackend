const express = require('express');
const { User, userValidationSchema } = require('../models/User');
const router = express.Router();

router.post('/user/save', async (req, res) => {
    try {
        const userCount = await User.countDocuments();
        const { error } = userValidationSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const newUser = new User({
            userId: userCount + 1,
            ...req.body
        });
        await newUser.save();
        return res.status(200).json({
            success: "User Saved Successfully"
        });
    } catch (err) {
        console.log(err);
        return res.status(400).json({ error: err });
    }
});

module.exports = router;