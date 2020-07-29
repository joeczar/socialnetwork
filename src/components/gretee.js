import React from 'react';

export default function Greetee(props) {
    return (
        <span style={{
            color: 'tomato',
            fontFamily: 'impact',
            fontSize: '30px'
        }}>
            {props.name}
            {props.name == 'Kitty' && '😸'}
            {props.name != 'Kitty' && '🍪'}
        </span>
    )
}