const express=require('express');
const userRouter=express.Router();
const userController=require('../controllers/userController.js');
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
userRouter.get('/userPage',(req,res)=>{
    res.render('userPage',{
        user:req.session.user
    });
});
userRouter.get('/userInfo',(req,res)=>{
    res.render('userInfo',{
        user:req.session.user
    });
});
userRouter.post('/login',userController.login);
userRouter.post('/register',userController.register);
module.exports=userRouter;