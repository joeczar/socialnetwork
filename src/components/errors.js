import React from "react";

const Errors = ({ errors }) => {
    errors.length > 0 &&
        errors.map((err, key) => {
            return (
                <div className="error" key={key}>
                    {err}
                </div>
            );
        });
};
export default Errors;
