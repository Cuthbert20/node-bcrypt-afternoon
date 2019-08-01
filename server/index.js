require('dotenv').config()
const express = require('express')
const massive = require('massive')
const session = require('express-session')
const app = express()
const {SESSION_SECRET, CONNECTION_STRING, SERVER_PORT} = process.env
const ctrl = require("./controllers/authController")


//TOP level middleware
app.use(express.json())
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))



//ENDPOINTS
app.post('/auth/register', ctrl.register)//register
app.post('/auth/login', ctrl.login) //login



massive(CONNECTION_STRING).then(db => {
    app.set('db', db)

    app.listen(SERVER_PORT, () => console.log(`${SERVER_PORT} make it so!`))

}).catch(err => {
    console.log('error time', err)
})
