var app = require('./app');
var dotenv = require('dotenv');

dotenv.config();
// var db = require('./db');
const port = process.env.PORT;

// Start the application by listening to connections at specified port number
app.listen(port, () => console.log(`Example app listening on port ${port}!`))