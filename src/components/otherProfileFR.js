import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {} from "../helpers/actions";
import ProfilePic from "./profilePic";
import Person from "./person";
import style from "../css/otherProfile.module.css";
import FriendButton from "./friendButton";
import "../css/style.css";
import {
    receiveSuggestedFriends,
    setOtherProfileId,
    receiveOtherProfile,
    receiveFriendsRequests,
    receiveProfile,
} from "../helpers/actions";

export const OtherProfileFR = (props) => {
    useEffect(() => {
        const id = props.match.params.id;
        dispatch(setOtherProfileId(id));
        dispatch(receiveOtherProfile(id));
        dispatch(receiveSuggestedFriends(id));
        dispatch(receiveFriendsRequests());
        dispatch(receiveProfile());
    }, []);
    useEffect(() => {});
    const dispatch = useDispatch();
    const myId = useSelector((state) => state.profile && state.profile.id);

    const otherProfile = useSelector((state) => state.otherProfile);
    const myFriends = useSelector(
        (state) =>
            state.friends && state.friends.filter((friend) => friend.accepted)
    );
    const suggestedFriends = useSelector(
        (state) =>
            state.suggestedFriends &&
            state.suggestedFriends.filter(
                (friend) =>
                    myFriends &&
                    !myFriends
                        .map((myFriend) => myFriend.id)
                        .includes(friend.id) &&
                    friend.id !== myId
            )
    );

    console.log("suggestedFriends", suggestedFriends);
    return (
        <article className={style.wrapper}>
            {otherProfile && (
                <header className={style.otherProfile}>
                    <ProfilePic
                        name={(otherProfile.first, otherProfile.last)}
                        url={otherProfile.pic_url}
                        toggleUpload={null}
                        size="large"
                    />
                    <div className={style.infoWrapper}>
                        <h1 className={style.name}>
                            {otherProfile.first} {otherProfile.last}
                        </h1>
                        <div className={style.bio}>
                            <h2>Bio</h2>
                            <p>{otherProfile.bio}</p>
                        </div>
                        <FriendButton id={otherProfile.id} />
                    </div>
                </header>
            )}
            <section className={style.suggestedWrapper}>
                <h4>Suggested Friends</h4>
                {suggestedFriends &&
                    suggestedFriends
                        .map((friend) => {
                            const { id, first, last, pic_url } = friend;
                            return (
                                <>
                                    <Person
                                        key={id}
                                        id={id}
                                        first={first}
                                        last={last}
                                        url={pic_url}
                                        size="small"
                                    />
                                </>
                            );
                        })
                        .slice(0, 3)}
            </section>
        </article>
    );
};

export default OtherProfileFR;
