import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import * as io from "socket.io-client";
import { chatMessage, chatMessages } from "../helpers/actions";
import { socket } from "../helpers/socketInit";
import ChatBubble from "./chatBubble";
import style from "../css/chat.module.css";

const Chat = ({ userId }) => {
    const [message, setMessage] = useState();
    const chats = useSelector((state) => state.chatMessages);

    console.log("chats", userId);
    const handleChange = (e) => {
        setMessage(e.target.value);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        socket.emit("chatMessage", message);
        setMessage("");
    };
    const chatRef = useRef();
    const scrollRef = useRef();
    useEffect(() => {
        console.log("Is this even working?");
        chatRef.current.scrollTop;
        scrollRef.current.scrollIntoView({
            behavior: "smooth",
        });
    }, [chats]);

    return (
        <div className={style.chatWrapper}>
            <h1>Chatty chat chat</h1>

            <div className={style.chats}>
                <div className={style.bubbleWrapper} ref={chatRef}>
                    {chats &&
                        chats.map((chat) => {
                            const date = new Date(chat.ts).toLocaleDateString();
                            const time = new Date(chat.ts).toLocaleTimeString();
                            return (
                                <ChatBubble
                                    message={chat.message}
                                    usrImg={chat.pic_url}
                                    time={`${time} ${date}`}
                                    userId={chat.user_id}
                                    name={{
                                        first: chat.first,
                                        last: chat.last,
                                    }}
                                    profileId={userId}
                                    msgId={chat.msg_id}
                                    key={chat.msg_id}
                                />
                            );
                        })}
                    <div className="scroll-marker" ref={scrollRef}></div>
                </div>
                <form className={style.form}>
                    <textarea
                        value={message}
                        onChange={(e) => handleChange(e)}
                    ></textarea>
                    <button onClick={(e) => handleSubmit(e)}>Submit</button>
                </form>
            </div>
        </div>
    );
};

export default Chat;
