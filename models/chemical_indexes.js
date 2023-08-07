const mongoose = require('mongoose');

const Chemical_Indexes_Schema = new mongoose.Schema({
    name_place: {
        type: String,
        required: true
    },
    chemical_index: {
        type: String,
        required: true
    },
    result_chemical_index: {
        type: String,
        required: true
    },
    date_analysis: {
        type: String,
        required: true
    },
    comment: {
        type: String
    }
})

const Chemical_Index = mongoose.model('chemical_indexes', Chemical_Indexes_Schema);

module.exports = { Chemical_Index };