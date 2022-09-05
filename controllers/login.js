const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const conn = require('../db');

exports.login = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    try {

        var existsQuery = await conn.query(
            `SELECT * FROM user WHERE email=? and is_active`,
            [req.body.email]
        );

        if (existsQuery.length === 0) {
            return res.status(422).json({
                message: "Invalid email address",
            });
        } else { existsQuery = existsQuery[0]; }

        const passMatch = await bcrypt.compare(req.body.password, existsQuery.passhash);
        if (!passMatch) {
            return res.status(422).json({
                message: "Incorrect password",
            });
        }

        const theToken = jwt.sign(
            { id: existsQuery.user_id },
            "0F#ku%0Rz9$.s%06>\"a-MdhL]S+>v{",
            { expiresIn: '24h' }
        );

        const permissions = (
            await conn.query(
                `select permission
                    from designation_permission
                    where designation_id = ?`,
                [existsQuery.designation_id]
            ));
        const dep = (await conn.query(
            `select dep_name, department_id
                from department
                where is_active and 
                department_id = (
                    select department_id from designation where designation_id=?
                )`,
            [existsQuery.designation_id]
        ))[0];

        const permission_List = [];
        for (const m in permissions) { permission_List.push(permissions[m].permission); }
        existsQuery.permissions = permission_List;
        existsQuery["token"] = theToken;
        existsQuery["dep_name"] = dep.dep_name;
        existsQuery["department_id"] = dep.department_id;
        existsQuery['title'] = (await conn.query(
            "select title from designation where designation_id=?",
            [existsQuery.designation_id]
        ))[0].title;
        delete existsQuery.passhash;
        delete existsQuery.create;
        delete existsQuery.end;
        delete existsQuery.is_active;
        delete existsQuery.is_deleted;
        return res.json(existsQuery);
    }
    catch (err) {
        next(err);
    }
}