import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    receiveFriendsRequests,
    acceptRequest,
    cancelRequest,
} from "../helpers/actions";
import Person from "./person";
import style from "../css/friends.module.css";

const Friends = () => {
    const dispatch = useDispatch();
    const requests = useSelector(
        (state) =>
            state.friends && state.friends.filter((friend) => !friend.accepted)
    );
    const friends = useSelector(
        (state) =>
            state.friends && state.friends.filter((friend) => friend.accepted)
    );
    console.log(friends);

    useEffect(() => {
        dispatch(receiveFriendsRequests());
    }, []);

    return (
        <div className={style.wrapper}>
            <h1>Friend Requests</h1>
            <div className={style.requestedWrapper}>
                {requests &&
                    requests.map((friend) => {
                        const { id, first, last, pic_url } = friend;
                        return (
                            <div className={style.requestWrapper} key={id}>
                                <Person
                                    id={id}
                                    first={first}
                                    last={last}
                                    url={pic_url}
                                    size="small"
                                />
                                <button
                                    onClick={(e) => dispatch(acceptRequest(id))}
                                    className={style.accept}
                                >
                                    Accept
                                </button>
                                <button
                                    onClick={(e) => dispatch(cancelRequest(id))}
                                    className={style.deny}
                                >
                                    Deny
                                </button>
                            </div>
                        );
                    })}
            </div>
            <h1>Friends</h1>
            <div className={style.friendsWrapper}>
                {friends &&
                    friends.map((friend) => {
                        const { id, first, last, pic_url } = friend;
                        return (
                            <div className={style.requestWrapper} key={id}>
                                <Person
                                    id={id}
                                    first={first}
                                    last={last}
                                    url={pic_url}
                                    size="small"
                                />
                                <button
                                    onClick={(e) => dispatch(cancelRequest(id))}
                                    className={style.end}
                                >
                                    End
                                </button>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};
export default Friends;
