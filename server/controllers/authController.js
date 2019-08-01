const bcrypt = require('bcryptjs')

module.exports = {
    register: async (req,res) => {
        const { username, password, isAdmin } = req.body
        const db = req.app.get('db')
        //Set the value of this SQL query to a variable called result.
        const result = await db.get_user({username})
        //Remember that SQL queries come back in an array
        const existingUser = result[0]
        if(existingUser){
            res.status(409).send(console.log("username Taken"))
        }else{
            const salt = bcrypt.genSaltSync(10)
            //this is where we make the hash bread with password and salt as our ingt
            const hash = bcrypt.hashSync(password, salt)
            const registeredUser = await db.register_user({isAdmin, username, hash})
            let user = registeredUser[0]
            req.session.user = {
                isAdmin: user.is_admin,
                id: user.id,
                username: user.username
            }
            console.log(req.session)
            res.status(201).send(req.session.user)
        }
    },
    login: async (req,res) => {
        const { username, password } = req.body
        console.log(req.body)
        const db = req.app.get('db')
        const foundUser = await db.get_user({username})
        const user = foundUser[0]
        //if user doesn't exsit we will send a status 401 error code
        if(!user) {
           return res.status(401).send('User not found. Please register as a new user before logging in Bro!')
        }
        //if user does exist we need to compare the password entered by the user at login to the hashed and salted version stored in the database
        const isAuthenticated = bcrypt.compareSync(password, user.hash)
        if(!isAuthenticated) {
            res.status(403).send('Wrong PassWord')
        }
        req.session.user = {
            isAdmin: user.is_admin,
            id: user.id,
            username: user.username
        }
        console.log(req.session)
        return res.status(200).send(req.session.user)
    },
    logout: async (req,res) => {
        //built in method to destroys the users session object, logging the user out
        req.session.destroy()
        res.sendStatus(200)
    }
}
