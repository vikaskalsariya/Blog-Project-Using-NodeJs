const slider = require('../model/slider')
module.exports.add_slider = async (req,res) => {
    return res.render('add_slider');
}

module.exports.addSlider = async(req,res)=>{
    try{
        if(req.file)
        {
            req.body.slider_image = slider.sliderImagePath+"/"+req.file.filename;
        }
        req.body.isActive = true;
        req.body.createdDate = new Date().toLocaleString();
        req.body.updatedDate = new Date().toLocaleString();
        await slider.create(req.body);
        console.log("Data store in DB sccussec fully");
    }
    catch(err)
    {
        console.log(err);
    }
    return res.redirect('back')
}

module.exports.viewSlider = async (req, res) => {

    let sliderData = await slider.find({});
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
    if (sliderData) {
        let data = await slider.find({
            'title': { $regex: `.*${search}.*`, $options: "i" }

        })
            .limit(perPage)
            .skip(perPage * page)
        var totalDocumets = await slider.find({
                'title': { $regex: `.*${search}.*`, $options: "i" }
        }).countDocuments();
        let totalPages = Math.ceil(totalDocumets / perPage);

        return res.render('view_slider', {
            sliderData: data,
            search : search,
            totalDocumets : totalPages,
            currentPage : page,
        });
    }
    }

    // ACTIVE BUTTON 
module.exports.active = async (req, res) => {
    try {
        let data = await slider.findById(req.params.id);
        data.isActive = false;
        await slider.findByIdAndUpdate(req.params.id, data);
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
        let data = await slider.findById(req.params.id);
        data.isActive = true;
        await slider.findByIdAndUpdate(req.params.id, data);
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
            await slider.findByIdAndDelete(req.params.id);
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
            let deleteData = await slider.deleteMany({_id : req.body.manyrecord});
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