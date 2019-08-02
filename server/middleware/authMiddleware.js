module.exports = {
    usersOnly: (req,res,next) => {
        if(!req.session.user){
            return res.status(401).send('please log in man')
        }
        next();
    }
}