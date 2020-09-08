import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";
import { receiveStreakDay, receiveStreak, saveNote } from "../helpers/actions";
import style from "../css/streakDayEditor.module.css";

const StreakDayEditor = ({ location }) => {
    const getSlug = location.pathname.split("/");
    const dispatch = useDispatch();
    const streak = useSelector((state) => state.streak && state.streak);
    const day = useSelector((state) => state.day && state.day);

    useEffect(() => {
        dispatch(receiveStreak(getSlug[3]));
    }, []);
    useEffect(() => {
        const day = getSlug[getSlug.length - 1];
        streak && dispatch(receiveStreakDay(streak.id, day));
    }, [streak]);
    day && console.log(day);
    return (
        <div className={style.wrapper}>
            {streak && (
                <>
                    <p>
                        {day &&
                            moment(day.streakDate).format(
                                "dddd, MMMM Do, YYYY"
                            )}
                    </p>
                    <h1 className={style.heading}>Day {day && day.day} of</h1>
                    <h2 className={style.heading}>
                        {" "}
                        <Link to={`/streaks/mystreaks/${streak.slug}`}>
                            {streak.title}
                        </Link>
                    </h2>

                    <h3 className={style.heading}>Description:</h3>
                    <p>{streak.description}</p>
                    <NotesEditor id={day && day.id} notes={day && day.notes} />
                </>
            )}
        </div>
    );
};

export default StreakDayEditor;

const NotesEditor = ({ id, notes }) => {
    const dispatch = useDispatch();
    const [showEdit, setShowEdit] = useState(false);
    const [newNote, setNewNote] = useState(notes);

    useEffect(() => {
        setNewNote(notes);
        console.log("NEW NOTE?", notes);
        setShowEdit(false);
    }, [notes]);
    const handleEdit = (e) => {
        e.preventDefault();
        setShowEdit(true);
    };
    const handleChange = (e) => {
        setNewNote(e.target.value);
    };
    const handleSave = (e) => {
        e.preventDefault();
        id && dispatch(saveNote(id, newNote));
    };
    const showNotes = (
        <div className={style.wrapper}>
            <h3 className={style.heading}>Notes:</h3>
            <p>{newNote && newNote.note}</p>
            <button onClick={(e) => handleEdit(e)}>
                {newNote ? "Edit" : "Add"}
            </button>
        </div>
    );
    const addNote = (
        <form className={style.wrapper}>
            <textarea
                defaultValue={newNote && newNote.note}
                onChange={(e) => handleChange(e)}
                placeholder="Add a note about this day."
            />
            <button onClick={(e) => handleSave(e)}>Save</button>
        </form>
    );
    const elem = showEdit ? addNote : showNotes;
    return elem;
};
