function serializeEventForResponse (event) {
    return {
        id: event._id,
        status: event.status,
        endDate: event.end_time
    }
}

function serializeRewardsInfoForResponse (user) {
    return {
        userNeedsRewardsForLastEvent: user.user_needs_rewards_for_last_event
    }
}

function serializeLeaderBoardForResponse (users) {
    return users.map(user => {
        return {
            id: user._id,
            score: user.current_event_score
        }
    })
}


module.exports = {
    serializeEventForResponse,
    serializeRewardsInfoForResponse,
    serializeLeaderBoardForResponse
}
