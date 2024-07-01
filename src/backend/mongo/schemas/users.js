const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    type: {
        type: String,
        enum: ['fish', 'whale', 'dolphin'],
        required: true
    },
    username: {
        type: String,
        required: true
    },
    deleted: {
        type: Boolean,
        default: false
    },
    current_event_score: { type: Number, default: 0 },
    password: {
        type: String,
        required: true
    },
    current_bucket_id: {
        type: Schema.Types.ObjectId,
        default: null
    },
    current_event_id: {
        type: Schema.Types.ObjectId,
        default: null
    },
    user_needs_rewards_for_last_event: {
        type: Number,
        default: null
    }
})

const Users = mongoose.model('Users', userSchema, 'Users')

module.exports = Users
