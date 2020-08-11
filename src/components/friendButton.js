import React, { useState, useEffect } from "react";
import axios from "../helpers/axios";

const FriendButton = ({ id }) => {
    const [buttonText, setButtonText] = useState();
    const [errors, setErrors] = useState({ show: [] });
    const cancelOrAccept = (request, userId) => {
        const { sender_id } = request;
        return userId === sender_id ? "Cancel" : "Accept";
    };
    const handleResponse = (data) => {
        console.log("handleResponse data", data, !data.rows || !data.rows[0]);
        if (!data.rows || !data.rows[0]) {
            // no friendship
            console.log("no rows, no friendship");
            setButtonText("Add");
        } else {
            const userId = data.userId;
            const request = data.rows[0];
            request.accepted
                ? setButtonText("End")
                : setButtonText(cancelOrAccept(request, userId));
        }
    };
    useEffect(() => {
        console.log("friendship btn props.id", id);
        (async () => {
            try {
                const { data } = await axios.get(`/friendship/${id}`);
                console.log("friend button", data);
                if (data.success) {
                    handleResponse(data);
                } else {
                    console.log("query failed");
                }
            } catch (err) {
                console.log("error in axios get /friendship", err);
            }
        })();
    }, []);
    const handleClick = async (e) => {
        e.preventDefault();
        let request;
        if (e.target.id === "denyBtn") {
            request = { action: "Cancel", recipient_id: id };
        } else {
            request = { action: buttonText, recipient_id: id };
        }
        try {
            const { data } = await axios.post("/friend-request", request);
            console.log("Handle click data", data);
            if (data.success) {
                console.log("sending data to handleResponse", data);
                handleResponse(data);
            } else {
                console.log("No response", data);
            }
        } catch (err) {
            console.log("Error in handleClick", err);
        }
    };

    return (
        <div>
            {buttonText && (
                <button id="friendBtn" onClick={(e) => handleClick(e)}>
                    {buttonText}
                </button>
            )}
            {buttonText === "Accept" && (
                <button id="denyBtn" onClick={(e) => handleClick(e)}>
                    Cancel
                </button>
            )}
        </div>
    );
};
export default FriendButton;
