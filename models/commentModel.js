// commentModel.js
const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const commentSchema=new Schema({
    content:{
        type:String,
        required:true
    },
    articleId:{
    	type:String,
    	required:true
    },
    username:{
        type:String,
        required:true
    }
});
module.exports=mongoose.model('Comment',commentSchema);