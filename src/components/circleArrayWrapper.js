import React, { useState, useEffect, useRef } from "react";
import { circlePos } from "../helpers/circleOfCircles";

const CircleArrayWrapper = ({ children, size }) => {
    const wrapperRef = useRef();
    const wrapper = {
        width: size,
        height: size,
        position: "relative",
    };
    const { yValues, xValues } = circlePos({
        radius: size / 4,
        steps: children.length,
        centerX: size / 2,
        centerY: size / 2,
        spread: 0,
    });

    return (
        <div style={wrapper} ref={wrapperRef}>
            {children.map((child, i) => {
                const posStyle = {
                    position: "absolute",
                    top: yValues[i] + "px",
                    left: xValues[i] + "px",
                    width: size / 4 + "px",
                    height: size / 4 + "px",
                };
                return <div style={posStyle}>{child}</div>;
            })}
        </div>
    );
};

export default CircleArrayWrapper;
