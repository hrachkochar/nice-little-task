const express = require('express')
const router = express.Router()
const controller = require('./controller')
const { tryCatchWrapper } = require('../../common/wrappers')

router.route('/')
    .get(tryCatchWrapper(controller.currentEvent))

router.route('/claim')
    .post(tryCatchWrapper(controller.claimRewards))


module.exports = router
