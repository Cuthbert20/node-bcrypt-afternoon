module.exports = {
    usersOnly: (req,res,next) => {
        if(!req.session.user){
            return res.status(401).send('please log in man')
        }
        next();
    },
    adminsOnly: (req,res,next) => {
        const { isAdmin } = req.session.user
        if(!isAdmin) {
            return res.status(403).send('Your not an admin man')
        }
        next()
    }
}