const eventModel = require('../backend/mongo/schemas/events')
const userModel = require('../backend/mongo/schemas/users')
const scoreService = require("../modules/scoring/service");
const EventEmitter = require('events')
const myEventEmitter = new EventEmitter()

const createEvent = async () => {
    console.log('Creating event')
    await userModel.updateMany({}, { current_event_score: 0, current_bucket_id: null, current_event_id: null })
    const now = new Date()
    const end = new Date(now.getTime() + 60 * 1000)
    const event = new eventModel({
        status: 'ongoing',
        start_time: now,
        end_time: end
    })
    await event.save()
    myEventEmitter.emit('eventCreated', event)
}

closeEvent = async (eventId) => {
    console.log('Closing event')
    const event = await eventModel.findOneAndUpdate({_id: eventId }, { status: 'ended' }, { lean: true, new: true })
    await scoreService.aggregateAllScoresAfterEvent(eventId)
    await userModel.updateMany({}, { current_event_score: 0, current_bucket_id: null, current_event_id: null })
    myEventEmitter.emit('eventClosed', event)
}

myEventEmitter.on('eventCreated', (event) => {
        console.log('Event created:', event)
        setTimeout(() => myEventEmitter.emit('closeEvent', event._id), 60 * 1000)
    })
myEventEmitter.on('eventClosed', (event) => {
        console.log('Event closed:', event)
        myEventEmitter.emit('createEvent');
    })
myEventEmitter.on('createEvent', createEvent)
myEventEmitter.on('closeEvent', (eventId) => closeEvent(eventId))





module.exports = myEventEmitter
