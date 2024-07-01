const service = require('./service')
const serializers = require('../../common/serializers')
async function reportScore (req, res) {
    const { user } = req
    const { score } = req.body
    await service.reportScore(user, score)
    res.status(200).json({message: 'Score reported successfully'})
}

async function leaderboard (req, res) {
    const leaderboard = await service.getLeaderboard(req.user.current_bucket_id)
    const serializedLeaderboard = serializers.serializeLeaderBoardForResponse(leaderboard)
    res.status(200).json(serializedLeaderboard)
}


module.exports = {
    reportScore,
    leaderboard
}
