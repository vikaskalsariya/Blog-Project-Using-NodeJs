const express = require("express");
const route = express.Router();
const postController = require("../controller/postController");
const post = require('../model/post');

route.get("/add_post", postController.add_post);

route.post('/addpost',post.postImage,postController.addpost);

route.get('/view_post',postController.viewpost)

route.get('/active/:id',postController.active);

route.get('/deactive/:id',postController.deactive);

route.get('/deleteItem/:id',postController.deleteItem);

route.post('/deleteManyrecord',postController.deleteManyrecord);

route.use('/comment',require('./comment'));
module.exports = route;