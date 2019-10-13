const MovieModel=require('../models/movie');
const express=require('express');
const router=express.Router()

router.post('/',(req,res)=>{
    const movie=new MovieModel(req.body)
    movie.save()
    .then((result)=>{
        res.send({movie:result})
    })
    .catch((err)=>{
        res.send({error:err})
    });
});

router.get('/',(req,res)=>{
    MovieModel.find()
    .sort({title:1})
    .then(result=>{
        res.send({result:result})
    })
    .catch(err=>{
        res.send({error:err})
    })
})

router.get('/:title',(req,res)=>{
    MovieModel.find({title:req.params.title})
    .then(result=>{
        res.send({result:result})
    })
    .catch(err=>{
        res.send({error:err})
    })
});

module.exports=router;