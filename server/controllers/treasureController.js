module.exports = {
    dragonTreasure: async (req,res) => {
        const db = req.app.get('db')
        const result = await db.get_dragon_treasure(1)
        return res.status(200).send(result);
    },
    getUserTreasure: async (req,res) => {
        const userTreasure = await req.app.get('db').get_user_treasure([req.session.user.id]);
        //getting the database instance
        // const db = req.app.get('db')
        //running the get_user_treasure sql file
        // const result = await db.get_user_treasure([req.session.user.id])
        res.status(200).send(userTreasure)
    }

}