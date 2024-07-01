const express = require('express')
const router = express.Router()
const controller = require('./controller')
const middleware = require('./middleware')
const { tryCatchWrapper } = require("../../common/wrappers")

router.route('/')
    .post(tryCatchWrapper(middleware.userTookRewards), tryCatchWrapper(controller.reportScore))

router.route('/leaderboard')
    .get(tryCatchWrapper(middleware.isThereLeaderboardToShow), tryCatchWrapper(controller.leaderboard))


module.exports = router
