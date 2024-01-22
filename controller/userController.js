const slider = require('../model/slider');
const offer = require('../model/offer');
const post = require('../model/post');
const comment = require('../model/comment');

module.exports.home = async (req,res)=>{
    try{

        const sliderData = await slider.find({});
        const offerData = await offer.find({isActive : true});
        const postData = await post.find({isActive : true});
        return res.render('user/home',{
            'sliderData':sliderData,
            'offerData':offerData,
            'postData' : postData,
        });
    }
    catch(err)
    {
        console.log(err)
        return res.redirect('back');
    }   
}

module.exports.singlePost = async (req,res)=>{
    try
    {

        // next prev page 
        let allpostData = await post.find({});
        var ids = [];
        allpostData.map((v,i)=>{
            ids.push(v.id);
        })
        for(let i=0;i<ids.length;i++)
        {
            if(ids[i] === req.params.id)
            {
                next = i;
                break;
            }
        }



        let spData = await post.findById(req.params.id);
        let postComments = await comment.find({postId:req.params.id})
        if(spData)
        {
            return res.render('user/singlePost',{
                postData : spData,
                postId : req.params.id,
                postComments : postComments,
                totalComents : postComments.length,
                allpostData : allpostData,
                cp : next,
            });
        }
        else 
        {
            return res.redirect('back');
        }
    }
    catch(err)
    {
        console.log(err);
        return res.redirect('back');
    }
    
}