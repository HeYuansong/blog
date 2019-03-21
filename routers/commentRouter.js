// commentRouter.js
const express=require('express');
const commentRouter=express.Router();
const commentController=require('../controllers/commentController.js');
commentRouter.post('/addComment',commentController.addComment);
module.exports=commentRouter;