const express = require("express");
const router = express.Router();
const Mongoose = require("mongoose");
const Joi = require("joi");
Mongoose.connect("mongodb://localhost/playground").then(res => {
    console.log("Db connection is successful");
});
const genreSchema = new Mongoose.Schema({
    id: Number,
    name: {type:String, required: true, minlength: 3}
});
const GenreModel = new Mongoose.model("Genre", genreSchema);

const genres = [
    {id: 1, name: "Action"},
    {id: 2, name: "Horror"},
    {id:3, name:"Romance"}
]

router.get("/", function(req, res) {
    GenreModel.find().then(result => {
        res.send({items: result});
    })
});

router.get("/:name", function(req, res) {
    GenreModel.find({name: {$regex: new RegExp(req.params.name,'i')}}).then(result => {
        res.send({item: result});
    });
});

router.post("/", function(req,res) {
    validateGenre(req.body).then(res => {
        let genreEntity = new GenreModel(req.body);
        genreEntity.save().then(saveRes => {
            res.send(saveRes);
        }).catch(saveErr => {
            res.status(500).send({error: saveErr})
        });
    }).catch(error => {
        res.status(500).send({error: error})
    });
   
   
});

router.put("/:id", function(req, res) {
    GenreModel.findByIdAndUpdate(req.params.id).then(result => {
        res.send({msg: "Success"});
    }).catch(error => {
        res.send({msg: "Error", error: error});
    });
});

router.delete("/:id", function(req, res) {
    GenreModel.findByIdAndRemove(req.params.id).then(result => {
        res.send({msg: "Success"});
    }).catch(error => {
        res.send({msg: "Error", error: error});
    });
});

function validateGenre(entity) {
    const schema = Joi.object().keys({
        name: Joi.string().required()
    });
    return Joi.validate(entity, schema);
}

module.exports = router;