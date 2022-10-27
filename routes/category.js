const db = require('../db');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();

/// POST insert category
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
            `call insert_category(?,?,?);`,
            [decoded.id, req.body.cat_name,
            req.body.department_id]
        );
        if (result[0] === undefined) return res.json(result);
        res.json(result[0][0]);
    } catch (err) {
        console.error(err.message);
        next(err);
    }
});

/// PUT set category name
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
            `call set_cat_name(?,?,?);`,
            [decoded.id, req.body.category_id, req.body.cat_name]
        );
        res.json(result[0][0]);
    } catch (err) {
        console.error(err.message);
        next(err);
    }
});

/// DELETE category
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
            `call delete_category(?,?);`,
            [decoded.id,req.body.category_id]
        );
        res.json(result);
    } catch (err) {
        console.error(err.message);
        next(err);
    }
});

module.exports = router;