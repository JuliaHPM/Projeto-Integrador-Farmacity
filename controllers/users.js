const User = require('../models/user');
const Note = require('../models/note');
const passport = require('passport');

module.exports = {
    async registerUser(req,res,next){
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
        });
        await User.register(newUser, req.body.password);
        res.redirect('/');
    },

    async loginUser(req, res, next){
        await passport.authenticate('local', (err, user, info)=>{
            if(err){ return next(err); }
            if(!user){ return res.redirect('/users/register');}
            req.logIn(user, function(err){
                if(err) {return next(err); }
                return res.redirect('/users/' + user.id);
            });
        })(req, res, next);
    },

    logoutUser(req, res, next){
        req.logout();
        res.redirect('/');
    },

    //popular as notas
    async showUser(req, res, next){
        let user = await User.findById(req.params.uid).populate('notes');
        res.render('showUser', {user});
    },

    async indexUser(req, res, next){
        let userList = await User.find({});
        res.render('indexUser', {userList});
    },

    async noteCreate(req,res, next){
        let post = await Note.create(req.body);
        res.redirect('/users/${post.id}');
    }
}