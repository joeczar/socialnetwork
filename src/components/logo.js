import React from "react";
import CircleArray from "./circles";
import ZenStreak from "./zenStreak";
import style from "../css/logo.module.css";

let radius = 0;
let spread = 0;
let centerX = 0;
let centerY = 0;
let steps = 8;

class Logo extends React.Component {
    constructor(props) {
        super(props);
        this.state = { width: 0, height: 0, r: [] };
    }

    componentDidMount() {
        const height = document.getElementById("circles").clientHeight;
        const width = document.getElementById("circles").clientWidth;
        console.log(width, height);
        this.setState({ height: height, width: width });
    }

    render() {
        // Square the SVG box and subtract margins
        if (this.state.width < this.state.height) {
            centerX = this.state.width;
            centerY = this.state.width;
            radius = this.state.width / 4;
        } else {
            // no need to subtract margins here
            centerX = this.state.height;
            centerY = this.state.height;
            radius = this.state.height / 4;
        }

        return (
            <div style={style} className={style.logo} id="circles">
                <CircleArray
                    radius={radius}
                    steps={steps}
                    centerX={centerX}
                    centerY={centerY}
                    className="circles"
                    spread={spread}
                />
                <h1 id="logoName">Zen Streak</h1>
            </div>
        );
    }
}

export default Logo;
