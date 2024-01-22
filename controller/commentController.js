const comment = require('../model/comment') 
module.exports.addComment = async (req,res)=>{
    try{
        let imgPath = '';
        if(req.file)
        {
            imgPath = comment.commentImagePath+"/"+req.file.filename;
        }
        req.body.comment_image = imgPath;
        req.body.isActive = true;
        req.body.createdDate = new Date().toLocaleString();
        req.body.updatedDate = new Date().toLocaleString();
        let cd = await comment.create(req.body);
        if(cd)
        {
            return res.redirect('back');
        }
        else 
        {
            console.log('comment is not send')
            return res.redirect('back');
        }
    }
    catch(err)
    {
        console.log(err)
        return res.redirect('back');
    }
}

module.exports.viewComment = async(req,res)=>{
    try{
        let Postcomment = await comment.find({}).populate("postId").exec();
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
        if (Postcomment) {
            let data = await comment.find({
                'email': { $regex: `.*${search}.*`, $options: "i" }
    
            })
                .limit(perPage)
                .skip(perPage * page)
                .populate("postId").exec()
            var totalDocumets = await comment.find({
                    'email': { $regex: `.*${search}.*`, $options: "i" }
            }).countDocuments();
            let totalPages = Math.ceil(totalDocumets / perPage);
    


        return res.render('view_comment',{
            comment : data,
            search : search,
            totalDocumets : totalPages,
            currentPage : page,
        })
    }
    }catch(err)
    {
        console.log(err);
        return res.redirect('back');
    }
}


// ACTIVE BUTTON 
module.exports.active = async (req, res) => {
    try {
        let data = await comment.findById(req.params.id);
        data.isActive = false;
        await comment.findByIdAndUpdate(req.params.id, data);
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
        let data = await comment.findById(req.params.id);
        data.isActive = true;
        await comment.findByIdAndUpdate(req.params.id, data);
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
            await comment.findByIdAndDelete(req.params.id);
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
        let deleteData = await comment.deleteMany({_id : req.body.manyrecord});
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