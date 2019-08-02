require('dotenv').config()
const express = require('express')
const massive = require('massive')
const session = require('express-session')
const app = express()
const {SESSION_SECRET, CONNECTION_STRING, SERVER_PORT} = process.env
const ctrl = require("./controllers/authController")
const treasureCtrl = require("./controllers/treasureController")
const auth = require('./middleware/authMiddleware')


//TOP level middleware
app.use(express.json())
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))



//ENDPOINTS
app.post('/auth/register', ctrl.register)//register button
app.post('/auth/login', ctrl.login) //login button
app.get('/auth/logout', ctrl.logout)//logout button

app.get('/api/treasure/dragon', treasureCtrl.dragonTreasure)
app.get('/api/treasure/user', auth.usersOnly, treasureCtrl.getUserTreasure)



massive(CONNECTION_STRING).then(db => {
    app.set('db', db)

    app.listen(SERVER_PORT, () => console.log(`${SERVER_PORT} make it so!`))

}).catch(err => {
    console.log('error time', err)
})
