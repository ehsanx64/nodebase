const express = require('express')
const app = express()
const port = 3000
const mod1 = require('./Module1')
const mods = [
    mod1
]

for (var i in mods) {
    mods[i](app)
}

app.use(express.static('public'))
app.set('view engine', 'pug')
// app.set('views', [
//     __dirname + '/views',
//     __dirname + '/Module1/views'
// ])
app.get('/', (req, res) => {
    res.render('home', {
        title: 'Home'
    })
})

app.get('/hello', (req, res) => {
    res.render('hello', {
        title: "Hello Page"
    })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))