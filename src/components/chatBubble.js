import React from "react";
import ProfilePic from "./profilePic";
import style from "../css/chatBubble.module.css";

const ChatBubble = ({
    msgId,
    message,
    usrImg,
    time,
    userId,
    name,
    profileId,
}) => {
    const bubbleClass = userId === profileId ? "user-bubble" : "other-bubble";

    return (
        <section
            className={`${style[bubbleClass]} ${style.bubble}`}
            key={msgId}
        >
            <ProfilePic
                name={name}
                url={usrImg}
                toggleUpload={null}
                size="small"
                class={bubbleClass}
            />
            <div className={style.message}>
                <p>{message}</p>
                <div className={style.info}>
                    <span className={style.name}>
                        {name.first} {name.last}
                    </span>
                    <span className={style.time}>{time}</span>
                </div>
            </div>
        </section>
    );
};

export default ChatBubble;
