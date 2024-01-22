const offer = require('../model/offer')

module.exports.addOffer = async (req, res) => {
    try {
        req.body.isActive = true;
        req.body.createdDate = new Date().toLocaleString();
        req.body.updatedDate = new Date().toLocaleString();
        await offer.create(req.body);
    }
    catch (err) {
        console.log(err);
    }
    return res.redirect('back')
}

module.exports.viewOffer = async (req, res) => {
    try {
        let offerData = await offer.find({});


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
        if (offerData) {
            let data = await offer.find({
                'title': { $regex: `.*${search}.*`, $options: "i" }

            })
                .limit(perPage)
                .skip(perPage * page)
            var totalDocumets = await offer.find({
                'title': { $regex: `.*${search}.*`, $options: "i" }
            }).countDocuments();
            let totalPages = Math.ceil(totalDocumets / perPage);



            if (offerData) {
                return res.render('eddit_offer', {
                    offers: data,
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
            let data = await offer.findById(req.params.id);
            data.isActive = false;
            await offer.findByIdAndUpdate(req.params.id, data);
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
            let data = await offer.findById(req.params.id);
            data.isActive = true;
            await offer.findByIdAndUpdate(req.params.id, data);
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
                await offer.findByIdAndDelete(req.params.id);
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
            let deleteData = await offer.deleteMany({_id : req.body.manyrecord});
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