const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const db = require('../db');

exports.register = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    try {
        const row = await db.query(
            "SELECT `email` FROM `user` WHERE `email`=?",
            [req.body.email]
        );

        if (row.length > 0) {
            return res.status(201).json({
                message: "The E-mail already in use",
            });
        }
        const passhash = await bcrypt.hash(req.body.password, 12);
        const rows = await db.query(
            `INSERT INTO user
            (user_name,email,passhash,designation_id)
            VALUES(?,?,?,?)`, [
            req.body.name,
            req.body.email,
            passhash,
            req.body.designation_id
        ], function (err, results) { });
        const result = await db.query(
            `select last_insert_id() as user_id`);
        res.json(result[0]);
    } catch (err) {
        next(err);
    }
}