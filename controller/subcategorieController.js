const subcategorie = require('../model/subcategorie')

const categorie = require('../model/categorie');

const fs = require('fs');
const path = require('path');


module.exports.addSubcategoriePage = async (req,res)=>{
    try{
        let catData = await categorie.find({});
        return res.render('add_subcategorie',{
            catData : catData,
        });
    }
    catch(err)
    {
        console.log(err)
        return res.redirect('back');
    }

}

module.exports.addSubcategorie = async (req,res)=>{
    try 
    {
        var imagePath = '';
        if(req.file)
        {
            imagePath =  subcategorie.subCatImagePath+"/"+req.file.filename;
        }
        req.body.subcaregorie_image = imagePath;
        req.body.isActive = true;
        req.body.createdDate = new Date().toLocaleString();
        req.body.updatedDate = new Date().toLocaleString();
        if(req.body)
        {
            await subcategorie.create(req.body);
        }
        else 
        {
            console.log("subcategorie data is not Store into database");
        }
    }
    catch(err)
    {
        console.log(err);
    }
    return res.redirect('back')
}
module.exports.viewUserSubcategorie = async (req,res)=>{
    try 
    {
        let subCatData = await  subcategorie.find({}).populate("categorieId").exec();
        let CatData = await  categorie.find({});
        return res.render('user/work',{
            subCatData : subCatData,
            CatData : CatData
        })
    }
    catch(err)
    {
        console.log(err);
    }
    return res.redirect('back')
}
module.exports.viewSubcategorier =module.exports.viewSubcategorier =async (req, res) => {

    let subCatData = await subcategorie.find({});
    let search = '';
    if (req.query.search) {
        search = req.query.search;
    }
    if (req.query.page) {
        page = req.query.page;
    }
    else {
        page = 0;
    }
    var perPage = 2;
    if (subCatData) {
        let data = await subcategorie.find({
            'title': { $regex: `.*${search}.*`, $options: "i" }

        })
            .limit(perPage)
            .skip(perPage * page)
            .populate('categorieId').exec();
        var totalDocumets = await subcategorie.find({
                'title': { $regex: `.*${search}.*`, $options: "i" }
        }).countDocuments();
        let totalPages = Math.ceil(totalDocumets / perPage);

        return res.render('view_subcategorie', {
            subCatData: data,
            search : search,
            totalDocumets : totalPages,
            currentPage : page,
        });
    }
    }

// ACTIVE BUTTON END
module.exports.active = async (req, res) => {
    try {
        let data = await subcategorie.findById(req.params.id);
        data.isActive = false;
        await subcategorie.findByIdAndUpdate(req.params.id, data);
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
        let data = await subcategorie.findById(req.params.id);
        data.isActive = true;
        await subcategorie.findByIdAndUpdate(req.params.id, data);
        return res.redirect("back");
    }
    catch (err) {
        console.log(err);
        return res.redirect("back");
    }
};
// DEACTIVE BUTTON END

// DELETE RECORDE
module.exports.deleteItem = async (req, res) => {
    try {
        if (req.params.id) {
            await subcategorie.findByIdAndDelete(req.params.id);
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
// DELETE RECORDE END

// UPDATE PAGE
module.exports.updateItem = async (req, res) => {
    try {
        if (req.params.id) {
            let updateData = await subcategorie.findById(req.params.id).populate("categorieId").exec();
            let catData = await categorie.find({});
            return res.render('update_subcategorie', {
                oldData: updateData,
                catData : catData,
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
module.exports.UpdateSubCatData = async (req, res) => {
    try {
        let data = await subcategorie.findById(req.body.id);
        if (data) {
            if (req.file) {
                req.body.subcaregorie_image = subcategorie.subCatImagePath + "/" + req.file.filename;
            }
            else {
                req.body.subcaregorie_image = data.subcaregorie_image;
            }
            if(req.body.categorieId != req.body.categorie)
            {
                req.body.categorieId = req.body.categorie;
            }
            req.body.updatedDate = new Date().toLocaleString();
            let updateData = await subcategorie.findByIdAndUpdate(req.body.id, req.body);
            if(updateData)
            {
                return res.redirect('/admin/subcategorie/eddit_Subcategorie');
            }
            else 
            {
                console.log("Subcategorie data is not updated");
                return res.redirect('back');
            }
        }
    }
    catch (err) {
        console.log(err);
        return res.redirect('/admin/view_admin');
    }
}
// UPDATE RECORDE END
module.exports.deleteManyrecord = async (req,res)=>{
    try{
        if(req.body.manyrecord)
        {
            let deleteData = await subcategorie.deleteMany({_id : req.body.manyrecord});
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