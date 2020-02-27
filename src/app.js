const express = require('express')
const app = express()
const port = 3000
const mod1 = require('./Module1')
const mods = [
    mod1
]

// Loop through modules and try to load them (app object passed to each module)
for (var i in mods) {
    mods[i](app)
}

// Use public as static assets folder
app.use(express.static('public'))
app.use(express.static('concept-assets'))

// Set view engine to pug
app.set('view engine', 'pug')

// Define views folders
app.set('views', [
    __dirname + '/../views',        // This is global views folder
    __dirname,                      // Current folder (src). We need it for module views reference
    // TODO: Setting the views folder for each module should be handled automatically
    __dirname + '/Module1/views'    // Views in Module1 folder
])

// Homepage route handler
app.get('/', (req, res) => {
    res.render('home', {
        title: 'Home',
        item: __dirname + '/../views'
    })
})

// /hello route handler
app.get('/hello', (req, res) => {
    res.render('hello', {
        title: "Hello Page"
    })
})

// Start the application by listening to connections at specified port number
app.listen(port, () => console.log(`Example app listening on port ${port}!`))