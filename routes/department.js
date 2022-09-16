const db = require('../db');
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
/// GET get child departments
router.get('/children', async function (req, res, next) {
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
            `call get_departments(?);`,
            [decoded.id]
        );
        res.json(result[0]);
    } catch (err) {
        next(err);
    }
});
/// POST insert department
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
            `call insert_department(?,?,?);`,
            [decoded.id, req.body.dep_name, req.body.parent_department_id]
        );
        res.json(result[0][0]);
    } catch (err) {
        console.error(err.message);
        next(err);
    }
});
/// PUT set dep name
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
            `call set_dep_name(?,?,?);`,
            [decoded.id, req.body.department_id, req.body.dep_name,]
        );
        res.json(result[0]);
    } catch (err) {
        console.error(err.message);
        next(err);
    }
});
/// DELETE department
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
            `call delete_department(?,?);`,
            [decoded.id, req.body.department_id]
        );
        res.json(result[0][0]);
    } catch (err) {
        console.error(err.message);
        next(err);
    }
});


module.exports = router;