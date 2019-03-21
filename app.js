const express=require('express');
const session=require('express-session');
const path=require('path');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/blog',{useNewUrlParser:true});
const app=express();
// app.engine('.html', require('ejs').renderFile);
app.set('view engine', 'ejs');
const allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  // res.header('Access-Control-Max-Age','1728000');
  next();
}
app.use('/',express.static(path.join(__dirname,'/public/')));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(session({
	secret:'keycat',
	resave:false,
	saveUninitialized:true
}));
const userRouter=require('./routers/userRouter.js');
const articleRouter=require('./routers/articleRouter.js');
const commentRouter=require('./routers/commentRouter.js');
app.use(userRouter);
app.use(articleRouter);
app.use(commentRouter);
// app.use("/admin",(req,res,next)=>{
// 	console.log(req.originalUrl,req.baseURI,req.path);
// 	next();
// })
app.listen(8800,()=>{
	console.log('app on 8800');
});