// A database is the main container, it contains the data and log files, and all the schemas within it.
// Schemas are like folders within a database, and are mainly used to group logical objects together, which leads to ease of setting permissions by schema.
const mongoose = require('mongoose')

const authorSchema =  new mongoose.Schema({ 
    name: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Author', authorSchema);