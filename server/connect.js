const mysql = require('mysql2');

// Create connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'hospital_mngmt'
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
const queryFunction = (queryData, next) => {
    //console.log(queryData)
    return new Promise((resolve, reject) => {
        if (!queryData || !queryData.sqlQuery) {
            return reject(new Error('No query provided'));
            next();
        }
        // Execute the query using parameterized values
        connection.execute(queryData.sqlQuery, queryData.values || [], (error, results) => {
            if (error) {
                console.error('Query execution error:', error);
                return reject(error);
                next();
            }
            resolve(results);
        });
    });
};


module.exports = { queryFunction, connection };
