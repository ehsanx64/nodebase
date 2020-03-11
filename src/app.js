const express = require('express')
const app = express()
const mod1 = require('./Module1')
const admin = require('./Admin')
const person = require('./Person')
const mods = [
    mod1, admin, person
]
var url = require('url');
var db = require('./db');

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

app.use(express.json());
app.use(express.urlencoded({extended: true}));

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

module.exports = app;