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
    },
    addUserTreasure: async (req,res) => {
        const { treasureURL } = req.body
        const { id } = req.session.user
        const db = req.app.get('db')
        const userTreasure = await db.add_user_treasure([treasureURL, id])
        res.status(200).send(userTreasure)
    },
    getAllTreasure: async (req,res) => {
        const db = await req.app.get('db')
        const results = await db.get_all_treasure()
        res.status(200).send(results)
    }

}