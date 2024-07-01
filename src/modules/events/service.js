const eventModel = require('../../backend/mongo/schemas/events')
const userModel = require('../../backend/mongo/schemas/users')

function getCurrentEvent () {
    return eventModel.findOne({status: 'ongoing'}, {}, {lean: true})
}

function getRewardsInfo (userId) {
    return userModel.findById(userId, 'user_needs_rewards_for_last_event', {lean: true})
}

function claimRewards (user) {
    return userModel.findByIdAndUpdate(user._id, { user_needs_rewards_for_last_event: null }, { lean: true })
}

module.exports = {
    getCurrentEvent,
    getRewardsInfo,
    claimRewards
}
