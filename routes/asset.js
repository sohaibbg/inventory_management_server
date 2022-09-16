const db = require('../db');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();

/// POST insert asset
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
            `call insert_asset(?,?,?,?,?,?,?,?,?);`,
            [decoded.id, req.body.category_id,
            req.body.parent_asset_id,
            req.body.supplier_id,
            req.body.supplier_asset_id,
            req.body.warranty_till,
            req.body.date_scrapped,
            req.body.scrapped_by,
            req.body.note,
            ]
        );
        const asset_id = result[0][0].asset_id;
        for (attrId of req.body.attrIds) {
            await db.query(
                `call insert_asset_attr(?,?,?);`,
                [decoded.id, attrId, asset_id]
            );
        }
        res.json(result[0][0]);
    } catch (err) {
        console.error(err.message);
        next(err);
    }
});

/// POST insert transfer
router.post('/transfer', async function (req, res, next) {
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
            `call insert_transfer(?,?,?);`,
            [decoded.id, req.body.asset_id, req.body.to_emp
            ]
        );
        res.json(result[0][0]);
    } catch (err) {
        console.error(err.message);
        next(err);
    }
});

// /// GET asset by category
// router.get(`/:category_id`, async function (req, res, next) {
//     try {
//         if (
//             !req.headers.authorization ||
//             !req.headers.authorization.startsWith('Bearer') ||
//             !req.headers.authorization.split(' ')[1]
//         ) {
//             return res.status(422).json({
//                 message: "Please provide the token",
//             });
//         }
//         const theToken = req.headers.authorization.split(' ')[1];
//         const decoded = jwt.verify(theToken, "0F#ku%0Rz9$.s%06>\"a-MdhL]S+>v{");
//         const result = await db.query(
//             `call get_assets(?,?);`,
//             [decoded.id, req.params.category_id]
//         );
//         res.json(result);
//     } catch (err) {
//         console.error(err.message);
//         next(err);
//     }
// });

/// DELETE asset
router.delete('/scrap', async function (req, res, next) {
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
            `call scrap_asset(?,?);`,
            [req.body.assetId, decoded.id]
        );
        res.json(result[0]);
    } catch (err) {
        console.error(err.message);
        next(err);
    }
});

/// PUT set note
router.put('/set_note', async function (req, res, next) {
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
            `call set_asset_note(?,?,?);`,
            [decoded.id, req.body.asset_id, req.body.note,]
        );
        res.json(result[0][0]);
    } catch (err) {
        console.error(err.message);
        next(err);
    }
});

/// PUT set dep name
router.put('/set_parent', async function (req, res, next) {
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
            `call set_asset_parent(?,?,?);`,
            [decoded.id, req.body.child_id, req.body.parent_id]
        );
        res.json(result[0][0]);
    } catch (err) {
        console.error(err.message);
        next(err);
    }
});


/// GET asset by asset id
router.get(`/:asset_id`, async function (req, res, next) {
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
            `call get_assets(?,?);`,
            [decoded.id, req.params.asset_id]
        );
        res.json(result);
    } catch (err) {
        console.error(err.message);
        next(err);
    }
});


module.exports = router;