require('dotenv').config();
const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");

module.exports.checkAdmin = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(
            token,
            process.env.TOKEN_KEY,
            async (err, decodedToken) => {
                if (err) {
                    res.json({ status: false });
                    next();

                } else {
                    const admin = await Admin.findById(decodedToken.id);
                    if (admin) res.json({ status: true, admin: admin.email });
                    else res.json({ status: false });
                    next();
                }
            });
    } else {
        res.json({ status: false });
        next();
    }
}