import React from "react";

const Errors = ({ errors }) => {
    return (
        errors.length > 0 &&
        errors.map((err, key) => {
            return (
                <div className="error" key={key}>
                    {err}
                </div>
            );
        })
    );
};
export default Errors;
