const mongoose=require('mongoose');

const movieSchema=new mongoose.Schema({
    title:String,
    numberInStock:Number,
    dailyRentalRate:Number,
    genre:{
        type: new mongoose.Schema({
            name:String
        }),
        required:true
    }

})

module.exports=  new mongoose.model('Movie',movieSchema)