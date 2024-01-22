const admin = require('../model/admin.js')

const fs = require('fs');

const passport = require('passport');

const nodemailer = require('nodemailer');

const path = require('path');

// HOME PAGE 
module.exports.dashboard = async (req, res) => {

    return res.render('dashboard');
}

// HOME PAGE 
module.exports.add_admin = (req, res) => {
    return res.render('add_admin');

};

// STORE DATA IN MONGODB
module.exports.addAdminData = async (req, res) => {
    try {
        if (req.file) {
            req.body.admin_image = admin.AdminImagePath + "/" + req.file.filename;
        }
        else {
            console.log("image Path not found");
            return res.redirect('back');
        }
        req.body.name = req.body.fname + req.body.lname;
        req.body.isActive = true;
        req.body.createdDate = new Date().toLocaleString();
        req.body.updatedDate = new Date().toLocaleString();
        if (req.body) {
            await admin.create(req.body);
            console.log("Data store in DB sccussec fully");
            return res.redirect('back');
        }
        else {
            console.log("Data not store in DB");
            return res.render('back');
        }
    }
    catch (err) {
        console.log(err);
    }
};

// SHOW DATA IN WEBPAGE 
module.exports.view_admin = async (req, res) => {
    try {
        let AdminData = req.user;
        let search = '';
        if(req.query.search)
        {
            search = req.query.search;
        }
        if(req.query.page)
        {
            page = req.query.page;
        }
        else 
        {
            page = 0;
        }
        var perPage = 2;
        if (AdminData) {
            let data = await admin.find({
                $or : [
                    {'name' : {$regex : `.*${search}.*` , $options : "i"}},
                    {'email' : {$regex : `.*${search}.*`, $options : "i"}}
                ]
            })
            .limit(perPage)
            .skip(perPage*page)
            var totalDocumets = await admin.find({
                $or : [
                    {'name' : {$regex : `.*${search}.*` , $options : "i"}},
                    {'email' : {$regex : `.*${search}.*`, $options : "i"}}
                ]
            }).countDocuments();
            let totalPages =Math.ceil(totalDocumets/perPage);
            if (data) {
                return res.render('view_admin', {
                    adminData: data,
                    search : search,
                    totalDocumets : totalPages,
                    currentPage : page,
                });
            }
        }
        else {
            console.log("Data noy found");
            return res.redirect('/admin');
        }
    }
    catch (err) {
        console.log(err)
    }
};

// DELETE RECORDE
module.exports.deleteItem = async (req, res) => {
    try {
        if (req.params.id) {
            let deleteData = await admin.findById(req.params.id);
            if (deleteData.admin_image) {
                fs.unlinkSync(path.join(__dirname, "..", deleteData.admin_image));
            }
            else {
                console.log("Delete image not found");
                return res.redirect('back');
            }
            await admin.findByIdAndDelete(req.params.id);
            return res.redirect('back');

        }
        else {
            console.log("Delete items's id is not found")
            return res.redirect('back');
        }
    }
    catch (err) {
        console.log(err);
        return res.redirect('back');
    }
}

// UPDATE PAGE
module.exports.updateItem = async (req, res) => {
    try {
        if (req.params.id) {
            let updateData = await admin.findById(req.params.id);
            return res.render('update_admin', {
                oldData: updateData,
            })
        }
        else {
            console.log("Update items's id is not found")
            return res.redirect('back');
        }
    }
    catch (err) {
        console.log(err);
        return res.redirect('back');
    }
}

// UPDATE RECORDE
module.exports.UpdateAdminData = async (req, res) => {
    try {
        let data = await admin.findById(req.body.id);
        if (data) {
            if (req.file) {
                fs.unlinkSync(path.join(__dirname, "..", data.admin_image));
                req.body.admin_image = admin.AdminImagePath + "/" + req.file.filename;
            }
            else {
                req.body.admin_image = data.admin_image;
                req.body.updateData = new Date().toLocaleString();
            }

            // profile update 
            let temp = req.body;
            let updatedData = await admin.findByIdAndUpdate(req.body.id, req.body);
            // temp.password = data.password;
            temp._id = req.body.id;
            temp.createdDate = data.createdDate;
            temp.updatedDate = data.updatedDate;
            if (updatedData) {
                if (req.user.id == temp._id) {
                    req.user = temp;
                    return res.redirect("/admin/profile");
                }
                else {
                    return res.redirect('/admin/view_admin');
                }
            }
            // profile update end
            else {
                console.log("updete Data not found");
                return res.redirect('/admin/view_admin');
            }
        }
    }
    catch (err) {
        console.log(err);
        return res.redirect('/admin/view_admin');
    }
}
// UPDATE RECORDE END

// ACTIVE BUTTON 
module.exports.active = async (req, res) => {
    try {
        let data = await admin.findById(req.params.id);
        data.isActive = false;
        await admin.findByIdAndUpdate(req.params.id, data);
        return res.redirect("back");
    }
    catch (err) {
        console.log(err);
        return res.redirect("back");
    }
};
// ACTIVE BUTTON END

// DEACTIVE BUTTON
module.exports.deactive = async (req, res) => {
    try {
        let data = await admin.findById(req.params.id);
        data.isActive = true;
        await admin.findByIdAndUpdate(req.params.id, data);
        return res.redirect("back");
    }
    catch (err) {
        console.log(err);
        return res.redirect("back");
    }
};
// DEACTIVE BUTTON END

// LOGIN PAGE
module.exports.login = async (req, res) => {
    return res.redirect('/admin/dashboard');
}
// LOGIN PAGE END

// CHANGE PASSWORD 
module.exports.changePassword = async (req, res) => {
    try {
        if (req.user) {
            return res.render('changePassword', {
                AdminData: req.user,
            });
        }
        else {
            return res.redirect('/admin');
        }
    }
    catch (err) {
        console.log(err);
        return res.redirect('/admin/dashboard');
    }
}

module.exports.modifyPassword = async (req, res) => {
    try {
        let adminData = req.user;
        let AdminData = await admin.findById(adminData.id);
        if (AdminData) {
            if (AdminData.password == req.body.cpass) {
                if (req.body.cpass != req.body.cmpass) {
                    if (req.body.npass == req.body.cmpass) {
                        let updatePass = await admin.findByIdAndUpdate(AdminData._id, { password: req.body.npass });
                        if (updatePass) {
                            return res.redirect('/admin/logout');
                        }
                        else {
                            console.log("password is not change");
                        }
                    }
                    else {
                        console.log("new password and current password is not match");
                    }
                }
                else {
                    console.log('current password and new password are same')
                }
            }
            else {
                console.log("Current Password is not true");
            }
        }
        else {
            return res.redirect('/admin');
        }
        return res.redirect('back');
    }
    catch (err) {
        console.log(err);
        return res.redirect('/admin/dashboard');
    }
}
// CHANGE PASSWORD END.
// profile
module.exports.profile = async (req, res) => {
    try {
        if (req.user) {
            res.render("profile", {
                AdminData: req.user,
            })
        }
        else {
            console.log("Something wrong");
            res.redirect("back");
        }

    } catch (err) {
        console.log(err);
        res.redirect("back");
    }
}

module.exports.updateProfile = async (req, res) => {
    try {

        let data = await admin.findById(req.params.id);
        if (data) {
            res.render("update_admin", {
                oldData: req.user
            })
        }
        else {
            console.log("Record not found");
            res.redirect("back");
        }

    } catch (err) {
        console.log(err);
        res.redirect("back");
    }
}

// forgot passport 

module.exports.checkMail = async (req, res) => {
    try {
        let Currentemail = await admin.findOne({ email: req.body.email });
        if (Currentemail) {
            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                secure: true,
                auth: {
                    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
                    user: 'axyz44670@gmail.com',
                    pass: 'pimpchlfhhbsmhzb'
                }
            });

            var OTP = Math.round(1000+Math.random()*10000);
                // send mail with defined transport object
                const info = await transporter.sendMail({
                    from: "axyz44670@gmail.com", // sender address
                    to: Currentemail.email, // list of receivers
                    subject: "OTP", // Subject line
                    text: "Your otp", // plain text body
                    html: `<b>OTP : ${OTP}</b>`, // html body
                });

                res.cookie('otp',OTP);
                res.cookie('admin',Currentemail);
            console.log("Message sent");
            return res.redirect('/admin/otpPage');

        }
        else {
            console.log("Invalid email");
            return res.redirect('back');
        }
    }
    catch (err) {
        console.log(err);
        return res.redirect('back');
    }
}

module.exports.checkOtp = (req,res)=>{
    try{
        var otp = req.cookies.otp;
        if(req.body.otp == otp)
        {
            return res.redirect('/admin/forgotPassPage');
        }
        else
        {
            console.log('OPT is not patch');
            return res.redirect('back');
        }
    }
    catch(err)
    {
        console.log(err);
        return res.redirect('back');
    }
}

module.exports.newPass = async(req,res)=>{
    try{
        if(req.body.npass == req.body.cpass)
        {
             let data = await admin.findOne({email : req.cookies.admin.email});
             console.log(req.cookies.email);
            if(data)
            {
                let updatePass = await admin.findByIdAndUpdate(data.id,{password : req.body.cpass});
                if(updatePass)
                {
                    res.clearCookie('otp')
                    res.clearCookie('email')
                    return res.redirect('/admin/logout')
                }
                else 
                {
                    console.log("password not forgoot");
                    return res.redirect('back');
                }
            }
            else 
            {
                console.log("email cookie's data is not found");
                return res.redirect('back');
            }
            return res.redirect('back')
        }
        else 
        {
            console.log("new and confirm passwords are not match");
            return res.redirect('back')  
        }
    }
    catch(err)
    {
        console.log(err)
        return res.redirect('back');
    }
}

// delete mulipule recordes 
module.exports.deleteManyrecord = async (req,res)=>{
    try{
        console.log(req.body);
        if(req.body.manyrecord)
        {
            let deleteData = await admin.deleteMany({_id : req.body.manyrecord});
            if(deleteData)
            {
                console.log("record deleted");
            }
            else 
            {
                console.log("record not delete");
            }
        }
        else
        {
            console.log("record not selected");
        }
    }
    catch(err)
    {
        console.log(err);
    }
    return res.redirect("back");
}