const EventEmitter = require('events')
const serverStartEventEmitter = new EventEmitter()
const mongoConnection = require('../backend/mongo/connect')
const eventModel = require('../backend/mongo/schemas/events')
const gameEventManager = require('../schedulers/eventManager')

const initialize = async () => {
    const mongoDb = await mongoConnection()
    if (mongoDb.readyState === 1) {
        console.log('Connected to MongoDB')
    } else {
        console.error('Can\'t connect to MongoDB')
    }
    const currentEvent = await eventModel.findOne({ status: 'ongoing' }, {}, { lean: true })
    if (!currentEvent) {
        gameEventManager.emit('createEvent')
    } else {
        setTimeout(() => gameEventManager.emit('closeEvent', currentEvent._id), currentEvent.end_time.getTime() - Date.now())
    }
    serverStartEventEmitter.emit('initialization successful', null, { status: 'connected' })
}

initialize()
    .catch(error => {
        console.error('Server can\'t run', error)
        process.exit(1)
    })

module.exports = serverStartEventEmitter
