const express = require('express')
const app = express()
const mod1 = require('./Module1')
const admin = require('./Admin')
const mods = [
    mod1, admin
]
var url = require('url');

function fullUrl(req) {
  return url.format({
    protocol: req.protocol,
    host: req.get('host'),
    pathname: req.originalUrl
  });
}

global.nodebase = {
    name: "nodebase",
    title: "Nodebase",
};

// Loop through modules and try to load them (app object passed to each module)
for (var i in mods) {
    mods[i](app)
}

// Use public as static assets folder
app.use(express.static('public'))
app.use('/assets', express.static(__dirname + '/../concept-assets'))

// Set view engine to pug
app.set('view engine', 'pug')

// Define views folders
app.set('views', [
    __dirname + '/views',        // This is global views folder
    __dirname,                      // Current folder (src). We need it for module views reference
    // TODO: Setting the views folder for each module should be handled automatically
    __dirname + '/Module1/views'    // Views in Module1 folder
])

// Homepage route handler
app.get('/', (req, res) => {
    // let path = require('path')
    // res.sendFile(path.join(__dirname + '/../views/index.html'))
    nodebase.currentUrl = fullUrl(req)
    res.render('home', {
        title: 'Home',
    })
})

// /hello route handler
app.get('/hello', (req, res) => {
    res.render('hello', {
        title: "Hello"
    })
})

// /data route handler
app.get('/data', (req, res) => {
    var data = require('./data')
    res.render('data', {
        title: "Data",
        data: data
    })
})

app.put('/data', (req, res) => {
    res.status(200).json(req.params)
})

module.exports = app;