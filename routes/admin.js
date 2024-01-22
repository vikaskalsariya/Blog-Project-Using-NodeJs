const express = require('express');

const route = express.Router();

const Admin = require('../model/admin.js');

const adminController = require('../controller/adminController');

const passport = require('../config/passport-local-strategie.js');

route.get('/',(req,res)=>{
    return res.render('login');
})


route.get('/dashboard',passport.checkAuth,adminController.dashboard);

route.get('/view_admin',passport.checkAuth,adminController.view_admin);

route.get('/add_admin',passport.checkAuth,adminController.add_admin);

route.post('/addAdminData',passport.checkAuth,Admin.AdminImage,adminController.addAdminData);

route.get('/deleteItem/:id',passport.checkAuth,adminController.deleteItem);

route.get('/updateItem/:id',passport.checkAuth,adminController.updateItem);

route.post('/UpdateAdminData',passport.checkAuth,Admin.AdminImage,adminController.UpdateAdminData);

route.get('/active/:id',passport.checkAuth,adminController.active);

route.get('/deactive/:id',passport.checkAuth,adminController.deactive);

route.post('/login',passport.authenticate('local',{failureRedirect : '/admin'}),adminController.login)

route.get('/logout',passport.checkAuth,async(req,res)=>{
    res.clearCookie('AdminData');
    return res.redirect('/admin');
})

route.get('/changePassword',passport.checkAuth,adminController.changePassword);

route.post('/modifyPassword',passport.checkAuth,adminController.modifyPassword);

route.get('/profile',passport.checkAuth,adminController.profile);

// Update Profile
route.get("/updateProfile/:id",passport.checkAuth, adminController.updateProfile);

// forgot passport 
route.get('/mailPage',(req,res)=>{
    return res.render('forgotPass/mailPage');
})


route.post('/checkMail',adminController.checkMail);

route.get('/otpPage',(req,res)=>{
    return res.render('forgotPass/otpPage');
})

route.post('/checkOtp',adminController.checkOtp);

route.get('/forgotPassPage',(req,res)=>{
    return res.render('forgotPass/forgotPassPage');
})

route.post('/newPass',adminController.newPass);

// slider
route.use("/slider",passport.checkAuth,require("./slider"));

//offers
route.use("/offer",passport.checkAuth,require("./offer"));

route.post('/deleteManyrecord',passport.checkAuth,adminController.deleteManyrecord);

// post 
route.use('/post',passport.checkAuth,require("./post"));

// categorie
route.use("/categorie",passport.checkAuth,require("./categorie"));

// Subcategorie
route.use("/subcategorie",passport.checkAuth,require("./subcategorie"));

module.exports = route;