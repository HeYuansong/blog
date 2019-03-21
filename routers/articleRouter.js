// articleRouter.js
const express=require('express');
const articleRouter=express.Router();
const articleController=require('../controllers/articleController.js');
articleRouter.get('/addArticle',(req,res)=>{
	res.render('addArticle',{
		user:req.session.user
	});
});
articleRouter.get('/userArticles',articleController.userArticles);
articleRouter.post('/addArticle',articleController.addArticle);
articleRouter.get('/articleDetail',articleController.articleDetail);
module.exports=articleRouter;