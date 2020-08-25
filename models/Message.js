const mongoose=require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new mongoose.Schema({
    message:{
        type:String,
        required:true
    },
    userName: {
        type: String,
        ref: "users"
    },
    room: {
        type: String
    },
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports=User=mongoose.model('message',MessageSchema)