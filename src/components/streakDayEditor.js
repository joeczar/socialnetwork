import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { receiveStreakDay, receiveStreak, saveNote } from "../helpers/actions";

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
    return (
        <div>
            {streak && (
                <>
                    <h1>Streak: {streak.title}</h1>
                    <h2>Description:</h2>
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

    useEffect(() => {}, [notes]);
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
        <div>
            <h3>Notes:</h3>
            <p>{notes}</p>
            <button onClick={(e) => handleEdit(e)}>
                {notes ? "Edit" : "Add"}
            </button>
        </div>
    );
    const addNote = (
        <form>
            <textarea
                defaultValue={notes && notes}
                onChange={(e) => handleChange(e)}
                placeholder="Add a note about this day."
            />
            <button onClick={(e) => handleSave(e)}>Save</button>
        </form>
    );
    const elem = showEdit ? addNote : showNotes;
    return elem;
};
