const mongoose = require('mongoose');

const Sampl_Place_Schema = new mongoose.Schema({
    type_water_object: {
        required: true,
        type: String,
    },
    name_place: {
        type: String,
        required: true,
    },
    coordinate_x:{
        required: true,
        type: Number,
    },
    coordinate_y: {
        required: true,
        type: Number,
    },
    comment: {
        type: String
    }
})

const Sampling_Place = mongoose.model('sampling_places', Sampl_Place_Schema);

module.exports = { Sampling_Place };
