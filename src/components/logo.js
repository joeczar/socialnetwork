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
        const logoTextHeight = document.getElementById("logoName").offsetHeight;
        const logoTextWidth = document.getElementById("logoName").offsetWidth;
        this.setState({
            height: height,
            width: width,
            logoHeight: logoTextHeight,
            logoWidth: logoTextWidth,
        });
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

        const outerWidth = { width: this.props.width };

        const pos = {
            position: "absolute",
            top: `calc(50% -  ${this.state.logoHeight / 2}px)`,
            right: `calc(50% - ${this.state.logoWidth / 2}px)`,

            textShadow: "0px 0px 5px rgba(0,0,0,1)",
        };

        return (
            <div className={style.logo} style={outerWidth} id="circles">
                <CircleArray
                    radius={radius}
                    steps={steps}
                    centerX={centerX}
                    centerY={centerY}
                    className="circles"
                    spread={spread}
                />
                <h1 id="logoName" style={pos} className={style.logoName}>
                    {outerWidth.width > 300 ? "Zen Streak" : "ZD"}
                </h1>
            </div>
        );
    }
}

export default Logo;
