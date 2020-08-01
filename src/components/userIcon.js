import React from "react";

function UserIcon(props) {
    const size = props.size;
    return (
        <svg>
            <defs>
                <clipPath id="circular-border">
                    <circle cx={size/2 + 25} cy={size/2 + 25} r={props.size*0.83} />
                </clipPath>
            </defs>
  
            <circle cx={size/2 + 25} cy={size/2 +25} r={props.size*0.93} fill="white" /> 
            <circle cx={size/2 + 25} cy={props.size*0.76 } r={props.size/3} />
            <circle cx={size/2 + 25} cy={props.size*1.83} r={props.size*0.63} clipPath="url(#circular-border)" />
        </svg>
    );
}

export default UserIcon;
