const getBucketModel = require('../../backend/mongo/schemas/buckets')
const userModel = require('../../backend/mongo/schemas/users')
const eventModel = require('../../backend/mongo/schemas/events')

async function reportScore (user, score) {
    if (!user.current_bucket_id) return addUserToBucket(user, score)
    await userModel.findByIdAndUpdate(user._id, {current_event_score: score})
}

const MAX_BUCKET_DISTRIBUTION = {
    fish: 150,
    whale: 10,
    dolphin: 40
}

async function addUserToBucket(user, score) {
    const currentEvent = await eventModel.findOne({ status: 'ongoing' }, {}, { lean: true })
    const bucketModel = getBucketModel(currentEvent._id)
    let bucket
    const potentialBuckets = await bucketModel.find(
        { ['distribution.' + user.type]: { $lt: MAX_BUCKET_DISTRIBUTION[user.type] } },{}, { lean: true }
    )
    if (!potentialBuckets.length) {
        const newBucket = new bucketModel({users: [user._id]})
        await newBucket.save()
        bucket = newBucket
    } else {
        bucket = potentialBuckets[0]
    }
    await Promise.all([userModel.findOneAndUpdate({ _id: user._id }, { current_bucket_id: bucket._id, current_event_score: score, current_event_id: currentEvent._id }), bucketModel.findOneAndUpdate({ _id: bucket._id }, { $push:  { players: user._id } ,$inc: { [`distribution.${user.type}`]: 1 }})])
}

async function aggregateAllScoresAfterEvent(eventId) {
    const bucketModel = getBucketModel(eventId)
    const buckets = await bucketModel.find({}, {}, { lean: true })
    console.log('buckets', buckets)
    const bucketUpdatePromiseArray = []
    for (const bucket of buckets) {
        console.log('bucket', bucket)
        const usersInBucket = await userModel.find({ current_bucket_id: bucket._id }, {}, { lean: true })
        console.log('usersInBucket', usersInBucket)
        const userFinalRewardPromiseArray = []
        usersInBucket.sort((a, b) => b.current_event_score - a.current_event_score)
        for (let i = 0; i < usersInBucket.length; i++) {
            userFinalRewardPromiseArray.push(userModel.findByIdAndUpdate(usersInBucket[i]._id, { user_needs_rewards_for_last_event: 199 - i }))
            bucket.final_standings.push({ _id: usersInBucket[i]._id, score: usersInBucket[i].current_event_score, position: i + 1})
        }
        bucketUpdatePromiseArray.push(bucketModel.findOneAndUpdate({ _id: bucket._id }, { final_standings: bucket.final_standings }))
        await Promise.all(userFinalRewardPromiseArray)
    }
    console.log(buckets)
    await Promise.all(bucketUpdatePromiseArray)
}

async function getLeaderboard (bucketId) {
    const usersInSameBucket = await userModel.find({ current_bucket_id: bucketId }, 'current_event_score', { lean: true })
    return usersInSameBucket.sort((a, b) => b.current_event_score - a.current_event_score)
}

module.exports = {
    reportScore,
    aggregateAllScoresAfterEvent,
    getLeaderboard
}
