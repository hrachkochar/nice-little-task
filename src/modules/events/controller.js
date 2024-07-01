const service = require('./service')
const serializers = require('../../common/serializers')
async function currentEvent (req, res) {
    const [currentEvent, rewardInfo] = await Promise.all([service.getCurrentEvent(), service.getRewardsInfo(req.user._id)])
    res.status(200).json({ currentEvent: serializers.serializeEventForResponse(currentEvent), rewardInfo: serializers.serializeRewardsInfoForResponse(rewardInfo) })
}

async function claimRewards (req, res) {
    await service.claimRewards(req.user)
    res.status(200).json({ message: 'Rewards claimed successfully' })
}

module.exports = {
    currentEvent,
    claimRewards
}
