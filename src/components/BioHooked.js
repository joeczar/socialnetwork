import React, { useState, useEffect } from "react";
import style from "../css/bio.module.css";

const BioHooked = (props) => {
    const [mode, setMode] = useState("add");
    const [draft, setDraft] = useState("Tell us about yourself");
    const [bio, setBio] = useState(null);

    useEffect(() => {
        if (props.bio == "" || !props.bio) {
            setMode("add");
        } else {
            setMode("showBio");
            setBio(props.bio);
            setDraft(props.bio);
            console.log("!!!!! useEffect BioHooked", props.bio, mode);
        }

        return () => {};
    }, [props.bio]);

    const handleAddBio = (e) => {
        e.preventDefault();
        setMode("edit");
    };
    const handleEdit = (e) => {
        e.preventDefault();
        props.setBio(draft);
        showBio();
    };
    const handleChange = (e) => {
        setDraft(e.target.value);
    };
    const showBio = () => {
        setMode("showBio");
        setBio(props.bio);
    };
    console.log("mode", mode, "bio", bio, props.bio);

    if (mode === "add") {
        return <AddBio handleAddBio={handleAddBio} />;
    } else if (mode === "edit") {
        return (
            <EditBio
                handleEdit={handleEdit}
                handleChange={handleChange}
                draft={draft}
            />
        );
    } else if (mode === "showBio") {
        return <ShowBio bio={bio} handleAddBio={handleAddBio} />;
    }
};

const AddBio = ({ handleAddBio }) => {
    return (
        <div className={style.bio}>
            <h2>Bio</h2>
            <button
                className={style.button}
                id="addBio"
                onClick={(e) => handleAddBio(e)}
            >
                Add a Bio
            </button>
        </div>
    );
};
const EditBio = ({ handleEdit, handleChange, draft }) => {
    return (
        <div className={style.bio} id="editWrapper">
            <h2>Bio</h2>
            <textarea
                defaultValue={draft}
                onChange={(e) => handleChange(e)}
            ></textarea>
            <button className={style.button} onClick={(e) => handleEdit(e)}>
                Save
            </button>
        </div>
    );
};
const ShowBio = ({ bio, handleAddBio }) => {
    return (
        <div className={style.bio}>
            <h2>Bio</h2>
            <p>{bio}</p>
            <button
                className={style.button}
                id="editBio"
                onClick={(e) => handleAddBio(e)}
            >
                Edit Bio
            </button>
        </div>
    );
};
export default BioHooked;
