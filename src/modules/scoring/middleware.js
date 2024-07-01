const userModel = require('../../backend/mongo/schemas/users')

async function userTookRewards (req, res, next) {
    try {
        if (req.user.user_needs_rewards_for_last_event) {
             return res.status(200).json({message: 'User needs rewards for last event', last_event_rewards: req.user.user_needs_rewards_for_last_event})
        }
        return next()
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

async function isThereLeaderboardToShow (req, res, next) {
    if (!req.user.current_bucket_id) {
        return res.status(200).json({message: 'User is not in a bucket yet'})
    }
    return next()
}


module.exports = {
    userTookRewards,
    isThereLeaderboardToShow
}
