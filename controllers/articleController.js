// articleController.js
const articleModel=require('../models/articleModel.js');
const commentModel=require('../models/commentModel.js');
exports.deleteArticle=function(req,res){
    articleModel.remove({_id:req.query.id},function(err){
        if(err){
            req.session.msg='err';
            res.redirect('/userArticles');
        }
        else{
            req.session.msg='success';
            res.redirect('/userArticles');
        }
    })
}
exports.indexArticles=function(req,res){
    articleModel.find(function(err,articles){
        if(err){
            console.log(err);
        }
        else{
            res.render('main',{
                user:req.session.user,
                articles
            })
        }
    });
}
exports.addArticle=function(req,res){
	if(req.session.user){
		new articleModel({...req.body,author:req.session.user.username}).save(function(err,article){
            if(err){
                res.render('addArticle',{
                    msg:'save err'
                })
            }
            else{
            	req.session.msg="success";
                res.redirect('/main');
            }
        })
	}
	else{
		res.redirect("/login");
	}
}
exports.userArticles=function(req,res){
    articleModel.find({author:req.session.user.username},function(err,articles){
        if(err){
            res.render('userArticles',{
                msg:'find err'
            });
        }
        else if(!articles){
            res.render('userArticles',{
                msg:'no articles'
            });
        }
        else{
            res.render('userArticles',{
                articles,
                msg:req.session.msg
            });
        }
    })
}
exports.articleDetail=function(req,res){
    articleModel.findOne({_id:req.query.id},(err,article)=>{
        if(err){
            res.render("articleDetail",{
                msg:"err"
            });
        } 
        else if(!article){
            res.render("articleDetail",{
                msg:"no article"
            });
        }
        else{
            commentModel.find({articleId:req.query.id},(err,comments)=>{
                if(err){
                    res.render("articleDetail",{
                        msg:"err"
                    });                    
                }
                else if(!comments){
                    res.render("articleDetail",{
                        article
                    });
                }
                else{
                    res.render("articleDetail",{
                        article,comments
                    })
                }
            });
        }
    })
}