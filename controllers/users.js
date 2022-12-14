const User = require('../models/user'); 

module.exports.renderRegisterForm = (req, res)=>{
    res.render('users/register')
}

module.exports.registerUser =  async (req, res, next)=>{
    try{
 const {username, email , password} = req.body ; 
 const user = new User ({email, username}); 
 const registeredUser = await User.register(user , password); 
 req.login(registeredUser, (err)=>{
     if (err) return next(); 
     req.flash('success', 'Welcome to yelpCamp!');
     res.redirect('/campgrounds'); 
 })

    }catch(e){
        req.flash('error', e.message);
        res.redirect('register');
    }
}

module.exports.renderLoginForm = (req, res)=>{
    res.render('users/login')
}

module.exports.loginUser = (req, res)=>{
    req.flash('success', 'Welcome back!');
    const redirectedUrl = req.session.returnTo || '/campgrounds' ; 
    delete req.session.returnTo ; 
    res.redirect(redirectedUrl); 
}

module.exports.logoutUser = (req , res)=>{
    req.logout(); 
    req.flash('success', 'Successfully logged out');
    res.redirect('/campgrounds')
}