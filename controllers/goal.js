import GoalsDB from '../models/Goal.js';
import UserDB from '../models/User.js';

export default {
    getAdd: async (req,res)=>{
        try{
            res.render('add.ejs', { user: req.user })
        }catch(err){
            console.log(err)
        }
    },
    postAdd: async (req, res)=>{
        try{
            req.body.userId = req.user.id;
            const goal = await GoalsDB.findOne({ 
                title: req.body.title,
                category: req.body.category,
                userId: req.user.id
            })
            if(goal){
                req.flash('errors', { msg: 'Goal already exists. Please choose a different one.' });
                return res.redirect('/goal/add')
            } 
            await GoalsDB.create(req.body)
            req.flash('success', { msg: 'Goal successfully added!' });
            res.redirect('/goal/add')
        } catch(err){
            console.error(err)
        }
    },
    updateStatus: async (req, res)=>{
        try{
            const newPoints = req.user.points + Number(req.params.points)
            await GoalsDB.findOneAndUpdate({_id: req.params.id},{
                completed: true,
            })
            await UserDB.findOneAndUpdate({_id: req.user._id},{
                points: newPoints
            })
            res.redirect('/dashboard')
        }catch(err){
            console.log(err)
        }
    },
    deleteGoal: async (req, res)=>{
        try{
            await GoalsDB.findByIdAndDelete(req.params.id)
            res.redirect('/dashboard')
        } catch(err){
            console.error(err)
        }
    },
}