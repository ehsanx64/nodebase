var app = require('./app');
var db = require('./db');
const port = 3000;

// Start the application by listening to connections at specified port number
app.listen(port, () => console.log(`Example app listening on port ${port}!`))