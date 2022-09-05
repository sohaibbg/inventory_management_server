const jwt = require('jsonwebtoken');
const conn = require('../db');

exports.getUser = async (req, res, next) => {
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
        // user details
        var result = (await conn.query(
            "SELECT * FROM user WHERE `user_id`=?",
            [decoded.id]
        ));
        if (result.length > 0) {
            result = result[0];
        } else {
            res.json({
                message: "No user found"
            });
        }
        result['title'] = (await conn.query(
            "select title from designation where designation_id=?",
            [result.designation_id]
        ))[0].title;
        // removed sensitive details
        delete result.password;
        delete result.create;
        delete result.end;
        delete result.is_active;
        delete result.is_deleted;
        // compile permissions
        const permissions = (await conn.query(
            `select permission
            from designation_permission
            where designation_id = ${result.designation_id}`
        ));
        const permission_List = [];
        for (const m in permissions) { permission_List.push(permissions[m].permission); }
        result.permissions = permission_List;
        return res.json(result);
    }
    catch (err) {
        next(err);
    }
}