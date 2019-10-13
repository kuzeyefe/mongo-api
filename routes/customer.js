const express=require('express')
const router=express.Router();
const CustomerModel=require('../models/customer');

router.post('/',(req,res)=>{
    const cust=new CustomerModel(req.body)
    cust.save().then((result)=>{
        res.send({result:result});
    })
    .catch((err)=>{
        res.send({result:err});
    });

});

router.get('/',(req,res)=>{
   CustomerModel.find()
    .sort({name:1})
    .then((result)=>{
        res.send({result:result})
    })
    .catch((err)=>{
        res.send({result:err})
    });
});

router.get('/:name',(req,res)=>{
    CustomerModel.find({name: req.params.name})
    .then((result)=>{res.send({result:result})})
    .catch((err)=>{
        res.send({result:err})
    });
});

router.put('/:id',(req,res)=>{
    CustomerModel.findByIdAndUpdate(req.params.id,{name:req.body.name},{new:true})
    .then((result)=>{
        res.send({result:result})
    })
    .catch((err)=>{
        res.send({result:err})
    });
});

router.delete('/:id',(req,res)=>{
    CustomerModel.findByIdAndRemove(req.params.id)
    .then((result)=>{
        res.send({result:result})
    })
    .catch((err)=>{
        res.send({error:err})
    })
})

module.exports=router;
