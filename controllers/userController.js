const userModel=require('../models/userModel.js');
const md5=require('blueimp-md5');
exports.login=function(req,res){
    userModel.findOne({
        email:req.body.email,
        password:md5(md5(req.body.password))
    },function (err, user) {
        if(err){
            res.render('login',{
                msg:'err'
            })
        }
        if(!user){
            res.render('login',{
                msg:'no user'
            })
        }
        else{
            req.session.user=user;
            res.redirect('/main');
        }
    })
};
exports.register=function(req,res){
    req.body.password=md5(md5(req.body.password));
    let {username,email}=req.body;
    userModel.findOne({$or:[{username},{email}]},function(err,data){
        if(err){
            return res.render('register',{
                msg:"find err"
            });
        }
        if(data){
            return res.render('register',{
                msg:"user already exists"
            });
        }
        new userModel(req.body).save(function(err,user){
            if(err){
                res.render('register',{
                    msg:'save err'
                })
            }
            else{
                req.session.user=user;
                res.redirect('/main');
            }
        })
    })
};