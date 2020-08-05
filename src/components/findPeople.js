import React, { useState, useEffect } from "react";
import axios from "../helpers/axios";
import Person from "./person";

export const FindPeople = () => {
    const [newUsers, setNewUsers] = useState([]);
    const [userInput, setUserInput] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                console.log("getting new users");
                const { data } = await axios.get("/new-users");
                setNewUsers(data.rows);
                console.log(data.rows);
            } catch (err) {
                console.log("Error in get New users", err);
            }
        })();
    }, []);
    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get(`/search-users/${userInput}`);
                setSearchResults(data.rows);
            } catch (err) {
                console.log("Error in search users", err);
            }
        })();
    }, [userInput]);

    const handleChange = (e) => {
        setUserInput(e.target.value);
    };
    return (
        <div>
            <h1>New Users</h1>
            {newUsers &&
                newUsers.map((user) => {
                    const { id, first, last, pic_url } = user;
                    return (
                        <Person
                            key={id}
                            id={id}
                            first={first}
                            last={last}
                            url={pic_url}
                            size="small"
                        />
                    );
                })}
            <div>
                <label>
                    Search
                    <input type="text" name="search" onChange={handleChange} />
                </label>
            </div>
            {searchResults && (
                <div>
                    <h2>Results</h2>
                    <div>
                        {searchResults.map((user) => {
                            const { id, first, last, pic_url } = user;
                            return (
                                <Person
                                    key={id}
                                    id={id}
                                    first={first}
                                    last={last}
                                    url={pic_url}
                                    size="small"
                                />
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};
