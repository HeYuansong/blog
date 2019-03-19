const express=require('express');
const session=require('express-session');
const path=require('path');
const bodyParser=require('body-parser');
const userRouter=require('./routers/userRouter.js');
const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/blog',{useNewUrlParser:true});
const app=express();
// app.engine('.html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use('/',express.static(path.join(__dirname,'/public/')));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(session({
	secret:'keycat',
	resave:false,
	saveUninitialized:true
}));
app.use(userRouter);
// app.use("/admin",(req,res,next)=>{
// 	console.log(req.originalUrl,req.baseURI,req.path);
// 	next();
// })
app.listen(8800,()=>{
	console.log('app on 8800');
});