const express=require('express');
const userRouter=express.Router();
const userController=require('../controllers/userController.js');
userRouter.get('/main',(req,res)=>{
    let msg;
    if(req.session.user){
        msg='successs';
    }
    else{
        msg='';
    }
    res.render('main',{
        msg,
        user:req.session.user
    });
});
userRouter.get('/login',(req,res)=>{
    res.render('login',{
        msg:''
    });
});
userRouter.get('/register',(req,res)=>{
    res.render('register',{
        msg:''
    });
});
userRouter.get('/logout',(req,res)=>{
    req.session.user=null;
    res.redirect('/');
});
userRouter.post('/login',userController.login);
userRouter.post('/register',userController.register);
module.exports=userRouter;
