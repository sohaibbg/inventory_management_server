const db = require('../db');
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
var SqlString = require('sqlstring');

/// POST insert property
router.post('/insert', async function (req, res, next) {
    try {
        if (
            !req.headers.authorization ||
            !req.headers.authorization.startsWith('Bearer') ||
            !req.headers.authorization.split(' ')[1]
        ) {
            return res.status(422).json({
                message: "Please provide the token",
            });
        }
        const theToken = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(theToken, "0F#ku%0Rz9$.s%06>\"a-MdhL]S+>v{");
        
        const result = await db.query(
            `call insert_property(?,?,?);`,
            [decoded.id, req.body.prop_name,
            req.body.category_id]
        );
        if (result.length === 0) res.json(result);
        res.json(result[0][0]);
    } catch (err) {
        console.error(err.message);
        next(err);
    }
});

/// PUT set prop name
router.put('/set_name', async function (req, res, next) {
    try {
        if (
            !req.headers.authorization ||
            !req.headers.authorization.startsWith('Bearer') ||
            !req.headers.authorization.split(' ')[1]
        ) {
            return res.status(422).json({
                message: "Please provide the token",
            });
        }
        const theToken = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(theToken, "0F#ku%0Rz9$.s%06>\"a-MdhL]S+>v{");
        const result = await db.query(
            `call set_prop_name(?,?,?);`,
            [decoded.id, req.body.property_id, req.body.prop_name,]
        );
        res.json(result[0][0]);
    } catch (err) {
        console.error(err.message);
        next(err);
    }
});



module.exports = router;