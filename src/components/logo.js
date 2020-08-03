import React from "react";
import CircleArray from "./circles";
import style from "../css/logo.module.css";
import { easeInOutQuad, easeOutQuad } from "../helpers/easing";

let step;
let requestAnimationFrame =
    window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame;

let cancelAnimationFrame =
    window.cancelAnimationFrame || window.mozCancelAnimationFrame;

const steps = 200;
const speed = 50;
const curve = [];
for (let i = 0; i < steps + 1; i++) {
    const stepValue = easeInOutQuad(i, 0, speed, steps);
    curve.push(stepValue);
}
let count = 0;

class Logo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 0,
            height: 0,
            r: [],
            radius: 0,
            spread: 0,
            centerX: 0,
            centerY: 0,
            steps: 8,
            change: 50,
            open: false,
        };
        this.spread = this.spread.bind(this);
    }

    componentDidMount() {
        const height = document.getElementById("circles").clientHeight;
        const width = document.getElementById("circles").clientWidth;
        console.log("height width", height, width);
        const logoTextHeight = document.getElementById("logoName").offsetHeight;
        const logoTextWidth = document.getElementById("logoName").offsetWidth;
        this.setState({
            height: height,
            width: width,
            logoHeight: logoTextHeight,
            logoWidth: logoTextWidth,
        });

        if (width < height) {
            this.setState({
                centerX: width,
                centerY: width,
                radius: width / 4,
            });
        } else {
            // no need to subtract margins here
            this.setState({
                centerX: height,
                centerY: height,
                radius: height / 4,
            });
        }
    }
    handleLogoClick(e) {
        e.preventDefault();
        console.log("clicked zd");
        this.setState({ open: true });
        step = this.spread();
        step = requestAnimationFrame(this.spread);
        cancelAnimationFrame(step);
    }
    spread() {
        this.setState({
            // radius: this.state.radius - 10,
            spread: this.state.spread + curve[count],
        });
        count++;
        if (this.state.spread <= 200) {
            step = requestAnimationFrame(this.spread);
        }
    }
    render() {
        // Square the SVG box and subtract margins

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
                    radius={this.state.radius}
                    steps={this.state.steps}
                    centerX={this.state.centerX}
                    centerY={this.state.centerY}
                    className={style.circleSvg}
                    spread={this.state.spread}
                />
                <h1
                    onClick={(e) => this.handleLogoClick(e)}
                    id="logoName"
                    style={pos}
                    className={style.logoName}
                >
                    {this.state.width > 300 ? "Zen Streak" : "ZD"}
                </h1>
            </div>
        );
    }
}

export default Logo;
