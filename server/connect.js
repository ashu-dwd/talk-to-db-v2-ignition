const mysql = require('mysql2');

// Create connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'iaas_platform'
});

// Connect and handle initial connection error
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        throw err;
    }
    console.log('Connected to MySQL database!');
});

// Promisify the queryFunction to properly handle async operations
const queryFunction = (queryData) => {
    console.log(queryData)
    return new Promise((resolve, reject) => {
        if (!queryData || !queryData.sqlQuery) {
            return reject(new Error('No query provided'));
        }
        // Execute the query using parameterized values
        connection.execute(queryData.sqlQuery, queryData.values || [], (error, results) => {
            if (error) {
                console.error('Query execution error:', error);
                return reject(error);
            }
            resolve(results);
        });
    });
};


module.exports = { queryFunction, connection };
