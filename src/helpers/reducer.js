export default function reducer(state = {}, action) {
    if (action.type == "RECEIVE_FRIENDS_REQUESTS") {
        state = Object.assign({}, state, {
            friends: action.friends,
        });
    }
    if (action.type == "ACCEPT_REQUEST") {
        state = {
            ...state,
            friends: state.friends.map((friend) => {
                if (friend.id == action.id) {
                    return {
                        ...friend,
                        accepted: true,
                    };
                } else {
                    return friend;
                }
            }),
        };
    }
    if (action.type == "CANCEL_REQUEST") {
        state = {
            ...state,
            friends: state.friends.filter((friend) => friend.id != action.id),
        };
    }
    if (action.type === "LATEST_MESSAGES") {
        return { ...state, chatMessages: action.data };
    }
    if (action.type === "NEWEST_MESSAGE") {
        return { ...state, chatMessages: [...state.chatMessages, action.data] };
    }
    if (action.type === "SET_OTHER_PROFILE_ID") {
        console.log(action);
        return { ...state, otherProfileId: action.id };
    }
    if (action.type === "RECEIVE_OTHER_PROFILE") {
        state = Object.assign({}, state, {
            otherProfile: action.data,
        });
    }
    if (action.type === "RECEIVE_SUGGESTED_FRIENDS") {
        state = Object.assign({}, state, {
            suggestedFriends: action.data,
        });
    }
    if (action.type === "RECEIVE_PROFILE") {
        state = Object.assign({}, state, {
            profile: action.data,
        });
    }
    if (action.type === "GENERATE_STREAK") {
        state = Object.assign({}, state, {
            streak: action.streak,
        });
        history.pushState("/streaks");
    }
    if (action.type === "RECEIVE_STREAKS") {
        state = Object.assign({}, state, {
            streaks: action.data,
        });
    }
    return state;
}
