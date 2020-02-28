var app = require('./app');
const port = 3000;

// Start the application by listening to connections at specified port number
app.listen(port, () => console.log(`Example app listening on port ${port}!`))