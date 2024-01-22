const express = require("express");
const route = express.Router();
const commentController = require("../controller/commentController");
const comment = require('../model/comment');

route.post('/addComment',comment.commentImage,commentController.addComment);

route.get('/view_comment',commentController.viewComment)


route.get('/active/:id',commentController.active);

route.get('/deactive/:id',commentController.deactive);

route.get('/deleteItem/:id',commentController.deleteItem);

route.post('/deleteManyrecord',commentController.deleteManyrecord);


module.exports = route;