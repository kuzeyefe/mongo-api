const express = require("express");
const router = express.Router();
const {Rental, validate} = require("../models/rental");
const Customer = require("../models/customer");
const Movie = require("../models/movie");


router.post("/", async (req, res) => {
    const { error } = validate(req.body);
    if(error) {
        return res.status(400).send({msg: "Validation Error!", error: error.details[0].message});
    }
    const customerEntity = await Customer.findById(req.body.customerId);
    if(!customerEntity) {
        return res.status(404).send({msg: "Customer Not Found!"});
    }
    const movieEntity = await Movie.findById(req.body.movieId);
    if(!movieEntity) {
        return res.status(404).send({msg: "Movie Not Found!"});
    }

    if(movieEntity.numberInStock == 0) {
        return res.status(404).send({msg: "Movie is not in stock!"});
    }

    const newRental = new Rental({
        customer: {
             _id: customerEntity._id,
             name: customerEntity.name,
             phone: customerEntity.phone
        },
        movie: {
            _id: movieEntity._id,
            title: movieEntity.title,
            dailyRentalRate: movieEntity.dailyRentalRate
        },
        rentalFee: 10
    });    
    const result = await newRental.save();
    res.send({entity: result});
});

module.exports = router;