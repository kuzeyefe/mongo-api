const Mongoose = require("mongoose");
const Joi = require("joi");

const customerSchema = new Mongoose.Schema({
    name: {
        type:String,
        required: true,
        minlength: 1,
        trim:true
    },
    phone: {
        type: String,
        required: true
    }
});

const movieSchema = new Mongoose.Schema({
    title: {
        type:String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 250
    },
    dailyRentalRate: {
        type:Number,
        min: 0
    }
});

const rentalSchema = new Mongoose.Schema({
    customer: {
        type: customerSchema,
        required: true,
    },
    movie: {
        type: movieSchema,
        required: true
    },
    dateOut: {
        type: Date,
        required: true,
        default: Date.now
    },
    dateReturned: {
        type: Date,
    },
    rentalFee: {
        type: Number,
        min: 0
    }

});



exports.Rental = new Mongoose.model("Rental", rentalSchema);
exports.validate = function validate(rental) {
    const validationSchema = {
        customerId: Joi.string().required(),
        movieId: Joi.string().required()
    };
    return Joi.validate(rental, validationSchema);
};

