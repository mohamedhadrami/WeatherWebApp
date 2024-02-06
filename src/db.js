const mysql = require('mysql2');

// Create a MySQL connection pool
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: 'weather_app_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

// Export the pool for reuse in other modules
module.exports = pool.promise()