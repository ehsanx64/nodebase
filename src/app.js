const express = require('express')
const app = express()
const mod1 = require('./Module1')
const admin = require('./Admin')
const mods = [
    mod1, admin
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

// /data route handler
app.get('/data', (req, res) => {
    var data = require('./data')
    res.render('data', {
        title: "Data",
        data: data
    })
})

app.get('/dbdata', (req, res) => {
    var Person = require('./models/person');

    Person.find().exec((err, persons) => {
        console.log('Persons:');
        console.log(persons);
        res.status(200).render('person', {
            message: 'Everything is fine.',
            data: persons
        });
    })
})

app.put('/dbdata', (req, res) => {
    var Person = require('./models/person');
    var george = new Person({
        name: 'George',
        age: 67
    });
    george.save().then(() => console.log('George saved')).catch(err => console.log(err));
    // console.log('PUT:/data');
    // console.log(req.body);
    // console.log(Person);
    // console.log(george);
    res.status(200).json({
        headers: {
            request: req.get('Content-Type'),
            name: req.get('name')
        },
        db: {
            type: typeof Person,
            schema: Person
        },
        body: req.body
    })

})

module.exports = app;