const userRoutes = require('../modules/user/routes')
const eventRoutes = require('../modules/events/routes')
const scoreRoutes = require('../modules/scoring/routes')
const Auth = require('../common/middleware/auth')
const router = require('express').Router()
const { tryCatchWrapper } = require('../common/wrappers')

const apiRoutes = [
    {
        route: '/user',
        module: [userRoutes]
    },
    {
        route: '/event',
        module: [tryCatchWrapper(Auth.verifyToken), eventRoutes]
    },
    {
        route: '/score',
        module: [tryCatchWrapper(Auth.verifyToken), scoreRoutes]
    }
]

for (const val of apiRoutes) {
    router.use(val.route, val.module)
}

module.exports = router
