const mongoose = require('mongoose')
const Schema = mongoose.Schema

const eventSchema = new Schema({
    status: {
        type: String,
        enum: ['soon', 'ongoing', 'ended'],
        required: true
    },
    end_time: {
        type: Date,
        required: true
    },
    start_time: {
        type: Date,
        required: true
    },
    buckets: {
        type: [String],
        default: []
    }
})

const Events = mongoose.model('Events', eventSchema, 'Events')

module.exports = Events
