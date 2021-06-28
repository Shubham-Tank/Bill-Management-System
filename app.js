const PORT = 9000

const mongoose = require('mongoose')
const express = require('express')
const app = express()
const ejs = require('ejs')
const routes = require('./routes/routes')

app.set('view engine', 'ejs')

app.use('/static', express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/', routes)


mongoose.connect('mongodb://localhost:27017/Bill-System', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to database')
        app.listen(PORT, (err) => {
            if (err)
                console.log('Error : ' + err)
            else
                console.log('server started at port ' + PORT)
        })
    })
    .catch((err) => {
        console.log(err)
    })