const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const conn = require('../db');

exports.register = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    try {
        const row = await conn.query(
            "SELECT `email` FROM `user` WHERE `email`=?",
            [req.body.email]
        );

        if (row.length > 0) {
            return res.status(201).json({
                message: "The E-mail already in use",
            });
        }
        const passhash = await bcrypt.hash(req.body.password, 12);
        const rows = await conn.query(
            `INSERT INTO user
            (user_name,email,passhash,designation_id)
            VALUES(?,?,?,?)`, [
            req.body.name,
            req.body.email,
            passhash,
            req.body.designation_id
        ], function (err, results) {
        });

        if (rows.affectedRows === 1) {
            return res.status(201).json({
                message: "The user has been successfully inserted.",
            });
        }

    } catch (err) {
        next(err);
    }
}