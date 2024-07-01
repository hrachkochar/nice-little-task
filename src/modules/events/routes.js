const express = require('express')
const router = express.Router()
const controller = require('./controller')

router.route('/')
    .get(controller.currentEvent)

router.route('/claim')
    .post(controller.claimRewards)


module.exports = router
