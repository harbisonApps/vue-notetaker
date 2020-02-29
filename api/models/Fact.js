const mongoose = require('mongoose')
const Schema = mongoose.Schema
const FactSchema = Schema(
    {
        name: { 
            type: String, 
            required: true 
        },
        category: { 
            type: String, 
            required: true 
        },
        description: {
            type: String,
            required: true
        },
        fullText: {
            type: String
        },
        imageUrl: {
            type: String,
            required: true
        },
    },
    { timestamps: true }
);
const Note = mongoose.model('Fact', FactSchema)
module.exports = Note;