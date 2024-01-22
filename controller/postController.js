const post = require('../model/post')
module.exports.add_post = async (req,res) => {
    // console.log("ok")
    return res.render('add_post');
}

module.exports.addpost = async(req,res)=>{
    try{
        if(req.file)
        {
            console.log(req.file);
            req.body.post_image = post.postImagePath+"/"+req.file.filename;
        }
        req.body.username = req.user.name;
        req.body.isActive = true;
        req.body.createdDate = new Date().toLocaleString();
        req.body.updatedDate = new Date().toLocaleString();
        await post.create(req.body);
        console.log("Data store in DB sccussec fully");
    }
    catch(err)
    {
        console.log(err);
    }
    return res.redirect('back')
}


 module.exports.viewpost = async (req, res) => {

    let postData = await post.find({});
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
    if (postData) {
        let data = await post.find({
            'username': { $regex: `.*${search}.*`, $options: "i" }

        })
            .limit(perPage)
            .skip(perPage * page)
        var totalDocumets = await post.find({
                'username': { $regex: `.*${search}.*`, $options: "i" }
        }).countDocuments();
        let totalPages = Math.ceil(totalDocumets / perPage);

        return res.render('view_post', {
            postData: data,
            search : search,
            totalDocumets : totalPages,
            currentPage : page,
        });
    }
    }


    // ACTIVE BUTTON 
module.exports.active = async (req, res) => {
    try {
        let data = await post.findById(req.params.id);
        data.isActive = false;
        await post.findByIdAndUpdate(req.params.id, data);
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
        let data = await post.findById(req.params.id);
        data.isActive = true;
        await post.findByIdAndUpdate(req.params.id, data);
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
            await post.findByIdAndDelete(req.params.id);
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
            let deleteData = await post.deleteMany({_id : req.body.manyrecord});
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