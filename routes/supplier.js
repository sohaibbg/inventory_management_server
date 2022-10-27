const db = require('../db');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();

/// POST insert supplier
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
            `call insert_supplier(?,?);`,
            [decoded.id, req.body.sup_name]
        );
        res.json(result[0][0]);
    } catch (err) {
        console.error(err.message);
        next(err);
    }
});

/// GET suppliers
router.get('/', async function (req, res, next) {
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
        // token and id
        const theToken = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(theToken, "0F#ku%0Rz9$.s%06>\"a-MdhL]S+>v{");
        
        res.json(await db.query(`call get_suppliers(?);`,[decoded.id]));
    } catch (err) {
        console.error(err.message);
        next(err);
    }
});
/// DELETE supplier
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
            `call delete_supplier(?,?);`,
            [decoded.id,req.body.supplier_id]
        );
        res.json(result);
    } catch (err) {
        console.error(err.message);
        next(err);
    }
});

module.exports = router;