const db = require('../db');
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

/// POST insert asset_model
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
            `call insert_asset_model(?,?,?,?,?);`,
            [decoded.id,
            req.body.am_name,
            req.body.category_id,
            req.body.min_stock,
            req.body.max_stock
            ]
        );
        res.json(result[0][0]);
    } catch (err) {
        console.error(err.message);
        next(err);
    }
});

/// POST insert attr
router.post('/insert_attr', async function (req, res, next) {
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
            `call insert_asset_model_attr(?,?,?);`,
            [decoded.id, req.body.am_id, req.body.attribute_id]
        );
        res.json(result[0][0]);
    } catch (err) {
        console.error(err.message);
        next(err);
    }
});

/// GET am details
router.get(`/:am_id`, async function (req, res, next) {
    try {
        const result = await db.query(
            `call get_am_details(?);`,
            [req.params.am_id]
        );
        res.json(result);
    } catch (err) {
        console.error(err.message);
        next(err);
    }
});

/// DELETE asset model
router.delete('/delete', async function (req, res, next) {
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
            `call delete_asset_model(?,?);`,
            [req.body.am_id, decoded.id]
        );
        res.json(result[0][0]);
    } catch (err) {
        console.error(err.message);
        next(err);
    }
});

/// PUT set am name
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
            `call set_am_name(?,?,?);`,
            [decoded.id, req.body.am_name, req.body.am_id]
        );
        res.json(result[0][0]);
    } catch (err) {
        console.error(err.message);
        next(err);
    }
});



module.exports = router;