const passport = require('passport');

const admin = require('../model/admin.js');
const LocalStrategie = require('passport-local').Strategy;

passport.use(new LocalStrategie({
    usernameField : "email",
},async (email,password,done)=>{
    let AdminData =await admin.findOne({email:email});
    if(AdminData)
    {
        if(password == AdminData.password)
        {
            return done(null,AdminData);
        }
        else 
        {
            return done(null,false);
        }
    }
    else 
    {
        return done(null,false);
    }
}));

passport.serializeUser((user,done)=>{
    done(null,user.id)
})

passport.deserializeUser(async (id,done)=>{
    let AdminData = await admin.findById(id);

    if(AdminData)
    {
        return done(null,AdminData);
    }
    else
    {
        return done(null,false);
    }
})

passport.setAuth = (req,res,next)=>{
    if(req.isAuthenticated())
    {
        res.locals.user = req.user;
    }
    return next();
}

passport.checkAuth = (req,res,next)=>{
    if(req.isAuthenticated())
    {
        next();
    }
    else
    {
        return res.redirect('/admin');
    }
}
module.exports = passport;