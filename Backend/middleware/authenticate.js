const jwt = require("jsonwebtoken")
require("dotenv").config()
const jwt_secret_key = process.env.jwt_secret_key || "masai";
const User = require("../models/User");

async function authenticateToken(req, res, next) {

    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).send({ msg: "Unauthorized" });

    }

    jwt.verify(token, jwt_secret_key, async (err, decodedToken) => {
        if (err) return res.status(401).send({ msg: "Forbidden ", "err": err })

        try {
            const user = await User.findById(decodedToken.userId);
            if (!user) {
                return res.status(404).send({ msg: "user not found" })

            }

            req.user = user;
            next();
        } catch (error) {
            console.log(error)
            res.status(500).send({ msg: "Intenal server error" })
        }
    })
}

module.exports = authenticateToken;