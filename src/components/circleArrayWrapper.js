import React, { useState, useEffect, useRef } from "react";
import { circlePos } from "../helpers/circleOfCircles";
import style from "../css/circleArrayWrapper.module.css";

const CircleArrayWrapper = ({ children, size }) => {
    const [hover, setHover] = useState(false);
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
    function circPos(size, children) {
        const { yValues, xValues } = circlePos({
            radius: size / 4 + 20,
            steps: children.length,
            centerX: size / 2,
            centerY: size / 2,
            spread: 0,
        });
        return { x: xValues, y: yValues };
    }
    const hoverPos = circPos(size, children);
    const handleMouseIn = () => {
        setHover(true);
    };
    const handleMouseOut = () => {
        setHover(false);
    };
    return (
        <div
            onMouseEnter={handleMouseIn}
            onMouseLeave={handleMouseOut}
            style={wrapper}
            ref={wrapperRef}
        >
            {children.map((child, i) => {
                const posStyle = {
                    position: "absolute",
                    top: hover ? hoverPos.y[i] : yValues[i] + "px",
                    left: hover ? hoverPos.x[i] : xValues[i] + "px",
                    width: size / 4 + "px",
                    height: size / 4 + "px",
                };
                return (
                    <div className={style.childWrapper} style={posStyle}>
                        {child}
                    </div>
                );
            })}
        </div>
    );
};

export default CircleArrayWrapper;
