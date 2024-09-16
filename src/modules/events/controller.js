const service = require('./service')
const serializers = require('../../common/serializers')
async function currentEvent (req, res) {
    const [currentEvent, rewardInfo] = await Promise.all([service.getCurrentEvent(), service.getRewardsInfo(req.user._id)])
    res.status(200).json({ currentEvent: serializers.serializeEventForResponse(currentEvent), rewardInfo: serializers.serializeRewardsInfoForResponse(rewardInfo) })
}

async function claimRewards (req, res) {
    const rewards = await service.claimRewards(req.user._id)
    console.log(rewards)
    if (!rewards.user_needs_rewards_for_last_event) return res.status(400).json({ message: 'Rewards already claimed' })
    return res.status(200).json({ message: 'Rewards claimed successfully' })
}

module.exports = {
    currentEvent,
    claimRewards
}
