const categorie = require('../model/categorie')

module.exports.addCategorie = async (req,res)=>{
    try 
    {
        req.body.isActive = true;
        req.body.createdDate = new Date().toLocaleString();
        req.body.updatedDate = new Date().toLocaleString();
        await categorie.create(req.body);
    }
    catch(err)
    {
        console.log(err);
    }
    return res.redirect('back')
}
module.exports.viewCategorie = async (req, res) => {
    try {
        let categorieData = await categorie.find({});


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
        if (categorieData) {
            let data = await categorie.find({
                'categorie': { $regex: `.*${search}.*`, $options: "i" }

            })
                .limit(perPage)
                .skip(perPage * page)
            var totalDocumets = await categorie.find({
                'categorie': { $regex: `.*${search}.*`, $options: "i" }
            }).countDocuments();
            let totalPages = Math.ceil(totalDocumets / perPage);



            if (categorieData) {
                return res.render('view_category', {
                    categorie: data,
                    search: search,
                    totalDocumets: totalPages,
                    currentPage: page,
                });
            }
            else {
                console.log("data not found");
                return res.redirect('back');
            }
        }
        }catch (err) {
            console.log(err)
            return res.redirect('back');
        }
    }
// ACTIVE BUTTON 
module.exports.active = async (req, res) => {
    try {
        let data = await categorie.findById(req.params.id);
        data.isActive = false;
        await categorie.findByIdAndUpdate(req.params.id, data);
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
        let data = await categorie.findById(req.params.id);
        data.isActive = true;
        await categorie.findByIdAndUpdate(req.params.id, data);
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
            await categorie.findByIdAndDelete(req.params.id);
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

module.exports.deleteManyrecord = async (req,res)=>{
    try{
        if(req.body.manyrecord)
        {
            let deleteData = await categorie.deleteMany({_id : req.body.manyrecord});
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