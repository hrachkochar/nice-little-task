const express = require('express')
const router = express.Router()
const controller = require('./controller')
const middleware = require('./middleware')

router.route('/')
    .post(middleware.userTookRewards, controller.reportScore)

router.route('/leaderboard')
    .get(middleware.isThereLeaderboardToShow, controller.leaderboard)


module.exports = router
