const mongoose = require('mongoose')
const Schema = mongoose.Schema

const playerScoreSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    score: {
        type: Number,
        required: true
    },
    position: {
        type: Number,
        required: true
    }
})
const distributionSchema = new Schema({
    fish: { type: Number, default: 0 },
    whale: { type: Number, default: 0 },
    dolphin: { type: Number, default: 0 }
})

const bucketSchema = new Schema({
    players: {
        type: [Schema.Types.ObjectId],
        default: []
    },
    final_standings: {
        type: [playerScoreSchema],
        default: []
    },
    distribution: { type: distributionSchema, default: () => ({}) }
})

function getBucketModel (eventId) {
    console.log(`event_${eventId}_buckets`)
    return mongoose.model(`event_${eventId}_buckets`, bucketSchema, `event_${eventId}_buckets`)
}

module.exports = getBucketModel
