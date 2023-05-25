const mongoose = require('mongoose');
const Joi = require('joi');

const runnerSchema = new mongoose.Schema({
    runnerId: {
        type: Number,
        unique: true,
    },
    runnerName: {
        type: String,
    },
    radius: {
        type: Number,
    },
    startTime: {
        type: Date,
    },
    endTime: {
        type: Date,
    },
    duration: {
        type: String,

    },
    speed: {
        type: Number,

    },
    numberOfLaps: {
        type: Number,
    },

});
const Runner = mongoose.model('Runner', runnerSchema);
const runnerValidationSchema = Joi.object({
    runnerName: Joi.string().required(),
    radius: Joi.number().required(),
    startTime: Joi.date().required(),
    endTime: Joi.date().required(),
    speed: Joi.number().required(),
    duration: Joi.string().required(),
    numberOfLaps: Joi.number().required()
});
module.exports = {
    Runner,
    runnerValidationSchema
};