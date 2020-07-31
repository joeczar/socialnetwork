import React from "react";
import Circle from "./circle";
import ZenStreak from "./zenStreak";

import { circlePos } from "../helpers/circleOfCircles";
import style from "../css/circles.module.css";

const Circles = ({ radius, steps, centerX, centerY, spread }) => {
    const { height, width } = { centerX, centerY };
    //Create an array of Circles
    const circArr = new Array(Number(steps)).fill(<Circle />);

    // Add x position, y position & radius values

    let position = circlePos({ radius, steps, centerX, centerY, spread });
    console.log(position);
    //sine wave for radius

    // map position values to array

    const renderedCircles = circArr.map((_circle, i) => {
        let xPos = position.xValues[i];
        let yPos = position.yValues[i];
        console.log(radius, xPos, yPos);
        return (
            <Circle
                key={i}
                radius={radius}
                cx={xPos}
                cy={yPos}
                spread={spread}
            />
        );
    });
    let svgWidth = 0;
    let svgHeight = 0;
    if (centerX > centerY) {
        svgWidth = centerY;
        svgHeight = centerY;
    } else {
        svgWidth = centerX;
        svgHeight = centerX;
    }

    return (
        <svg
            className={style.circles}
            width="100%"
            height="100%"
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        >
            <g
                id="circlesG"
                x={svgWidth / 2}
                y={svgHeight / 2}
                width="100%"
                height="100%"
            >
                {renderedCircles}
            </g>
        </svg>
    );
};

export default Circles;
