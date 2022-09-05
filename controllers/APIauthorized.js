const jwt = require('jsonwebtoken');
const conn = require('../db');

exports.APIauthorized = async (api, token) => {
    try {
        if (
            !token ||
            !token.startsWith('Bearer') ||
            !token.split(' ')[1]
        ) {
            return false;
        }

        const theToken = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(theToken, "0F#ku%0Rz9$.s%06>\"a-MdhL]S+>v{");

        const row = await conn.query(
            "select ? in (" +
            "select permission from designation_permission" +
            "where designation_id = (" +
            "select designation_id from user where user_id = ?" +
            ")" +
            ");",
            [api, decoded.id]
        );
        return row[0];
    }
    catch (err) {
        next(err);
    }
}