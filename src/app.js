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

app.get('/', (req, res) => res.send('Hello World!'))
app.use(express.static('public'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))