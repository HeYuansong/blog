// commentController.js
const commentModel=require('../models/commentModel.js');
exports.addComment=function(req,res){
	if(req.session.user){
		new commentModel({...req.body,username:req.session.user.username}).save(function(err,comment){
	        if(err){
	            res.render('articleDetail',{
	            	msg:"err"
	            });
	        }
	        else{
	            res.redirect(`/articleDetail?id=${req.body.articleId}`);
	        }
	    })
	}
	else{
		res.redirect('/login');
	}
}