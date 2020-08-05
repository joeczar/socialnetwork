import React, { useState, useEffect } from "react";
import axios from "../helpers/axios";

export const FindPeople = () => {
    const [newUsers, setNewUsers] = useState();

    useEffect(() => {
        (async () => {
            const { data } = await axios.get("recent-users");
            setNewUsers(data);
        })();
        return () => {
            cleanup;
        };
    }, []);
    return (
        <>
            <h1>Find People!</h1>
        </>
    );
};
const Person = ({ id, first, last, pic_url }) => {
    return (
        <div>
            <img src={pic_url} alt={`${first} ${last}`} />
            <h3>
                `${first} ${last}`
            </h3>
        </div>
    );
};
