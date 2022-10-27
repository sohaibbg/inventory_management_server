const db = require('../db');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();

/// POST insert employee
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

        var result = [];
        let i = 0;
        while (i < req.body.employee_ids.length) {
            result.push(await db.query(
                `call insert_employee(?,?,?);`,
                [decoded.id, req.body.employee_ids[i], req.body.names[i]
                ]
            )); i++;
        }
        res.json(result[0]);
    } catch (err) {
        console.error(err.message);
        next(err);
    }
});
/// PUT set emp name
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
            `call set_emp_name(?,?,?);`,
            [decoded.id, req.body.employee_id, req.body.emp_name]
        );
        res.json(result[0][0]);
    } catch (err) {
        console.error(err.message);
        next(err);
    }
});
/// DELETE employee
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
            `call delete_employee(?,?);`,
            [decoded.id, req.body.employee_id]
        );
        res.json(result);
    } catch (err) {
        console.error(err.message);
        next(err);
    }
});
/// GET catalogue
router.get(`/catalogue`, async function (req, res, next) {
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
        const result = await db.query(
            `call get_employees(?);`,
            [decoded.id]
        );
        res.json(result[0]);
    } catch (err) {
        console.error(err.message);
        next(err);
    }
});
/// GET assets
router.get(`/assets/:empId`, async function (req, res, next) {
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
        const result = await db.query(
            `call get_emp_assets(?,?);`,
            [decoded.id,req.params.empId]
        );
        res.json(result[0]);
    } catch (err) {
        console.error(err.message);
        next(err);
    }
});


module.exports = router;