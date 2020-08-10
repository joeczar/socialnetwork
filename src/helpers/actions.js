import axios from "./axios";

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
        action: "Add",
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
