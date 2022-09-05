const mysql = require('mysql2/promise');

async function query(sql, params) {
    const connection = await mysql.createPool({
        host: "localhost",
        user: "root",
        password: "password",
        database: "mis_asset_management",
        connectionLimit: 10
    });
    const [results,] = await connection.execute(sql, params);
    return results;
}

module.exports = {
    query
}