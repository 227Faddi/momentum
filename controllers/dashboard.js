import GoalsDB from '../models/Goal.js';

export default {
    getDashboard: async (req,res)=>{
        try{
            const goals = await GoalsDB.find({userId: req.user.id, completed: false }).lean()
            const message = req.flash('message')
            res.render('dashboard.ejs', { user: req.user, message, goals: goals })
        }catch(err){
            console.log(err)
        }
    },
}    