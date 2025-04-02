const express = require('express');
const cors = require('cors');
const handleUserRequest = require('./controllers/queryGen');
const aiResponse = require('./controllers/aiResponse');
const { queryFunction } = require('./connect');
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;



///important middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.static('uploads'));

//main api calling routes

//app.use('/api', handleUserRequest)
app.use('/api', async (req, res) => {
    const generatedQuery = await handleUserRequest(req, res);
    console.log("Generated Query:", generatedQuery);
    const handleSQLdata = await queryFunction(generatedQuery);
    console.log("SQL Data:", handleSQLdata);
    const finalResult = await aiResponse(req.body.query, handleSQLdata);
    //console.log("Final Result:", finalResult);
    res.send(finalResult);
});
app.get('/', (req, res) => {
    res.send('Welcome to the API!');
});

//starting the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});