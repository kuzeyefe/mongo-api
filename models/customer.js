const Mongoose=require('mongoose');

const Schema=new Mongoose.Schema({
    isGold:Boolean,
    name:String,
    phone:String
});

const Model=new Mongoose.model('Customer',Schema);

module.exports= Model;
