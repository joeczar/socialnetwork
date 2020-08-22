import axios from "./axios";
import Streak from "./newStreak";

export async function receiveFriendsRequests() {
    const { data } = await axios.get("/friends-and-requests");
    console.log("in actions", data);
    return {
        type: "RECEIVE_FRIENDS_REQUESTS",
        friends: data,
    };
}
export async function acceptRequest(id) {
    await axios.post("/friend-request", {
        action: "Accept",
        recipient_id: id,
        accepted: true,
    });
    return {
        type: "ACCEPT_REQUEST",
        id,
    };
}
export async function cancelRequest(id) {
    await axios.post("/friend-request", {
        action: "Cancel",
        recipient_id: id,
    });
    return {
        type: "CANCEL_REQUEST",
        id,
    };
}
export async function chatMessages(msgs) {
    return {
        type: "LATEST_MESSAGES",
        data: msgs,
    };
}

export async function chatMessage(msg) {
    return {
        type: "NEWEST_MESSAGE",
        data: msg,
    };
}
export async function setOtherProfileId(id) {
    return {
        type: "SET_OTHER_PROFILE_ID",
        id,
    };
}
export async function receiveOtherProfile(id) {
    const { data } = await axios.get(`/other-user/${id}`);

    return {
        type: "RECEIVE_OTHER_PROFILE",
        data,
    };
}
export async function receiveSuggestedFriends(id) {
    console.log("in actions", id);
    const { data } = await axios.get(`/suggested-friends/${id}`);

    return {
        type: "RECEIVE_SUGGESTED_FRIENDS",
        data,
    };
}
export async function receiveProfile() {
    const { data } = await axios.get("/user");
    return {
        type: "RECEIVE_PROFILE",
        data,
    };
}
export async function generateStreak(input) {
    try {
        const streak = new Streak(input);
        console.log(streak);
        const { data } = await axios.post("/api/streak", {
            streak: streak.save(),
        });

        return {
            type: "GENERATE_STREAK",
            streak: data,
        };
    } catch (err) {
        console.log("Error in generateStreak", err);
    }
}
export async function receiveStreaks() {
    try {
        const { data } = await axios.get("/api/streaks");

        // const streaks = data.map((strObj) => {
        //     console.log("in data", strObj.id);
        //     return {
        //         id: strObj.id,
        //         title: strObj.title,
        //         streak: new Streak(strObj.streak),
        //     };
        // });
        return {
            type: "RECEIVE_STREAKS",
            data,
        };
    } catch (err) {
        console.log("Error in receiveStreaks", err);
    }
}
