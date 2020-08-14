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
            size: "large",
            count: 0,
        };
        this.spread = this.spread.bind(this);
    }

    componentDidMount() {
        const height = document.getElementById("circles").clientHeight;
        const width = document.getElementById("circles").clientWidth;

        this.setState({
            height: height,
            width: width,
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
                radius: height / 4 - 5,
            });
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.open != this.props.open) {
            this.setState({ open: this.props.open });
            this.animate();
        }
        if (prevState.radius != this.state.radius) {
            const curve = new this.curve(50, 10, this.state.radius);
            this.setState({
                easeInOutQuad: curve.easeOutQuad,
                easeOutQuad: curve.easeOutQuad,
            });
        }
    }
    animate() {
        if (!this.state.open) {
            step = this.spread();
            step = requestAnimationFrame(this.spread);
            cancelAnimationFrame(step);
        } else {
            step = this.close();
            step = requestAnimationFrame(this.close);
            cancelAnimationFrame(step);
        }
    }
    spread() {
        console.log("opening");
        this.setState({
            // radius: this.state.radius - 10,
            spread:
                this.state.spread + this.state.easeOutQuad[this.state.count],
            count: this.state.count + 1,
        });

        if (this.state.spread <= this.state.radius - 10) {
            step = requestAnimationFrame(this.spread);
        }
    }
    close() {
        console.log("Closing");
        this.setState({
            // radius: this.state.radius - 10,
            spread:
                this.state.spread - this.state.easeInOutQuad[this.state.count],
            count: this.state.count - 1,
        });

        console.log(
            "Close show radius, spread",
            this.state.count,
            this.state.easeOutQuad[this.state.count],
            this.state.radius,
            this.state.spread
        );
        if (this.state.spread === 0) {
            console.log("closing animation stopped");
            step = requestAnimationFrame(this.spread);
        }
    }
    curve(time, endRadius, radius) {
        const steps = radius - endRadius;
        const speed = time;
        this.easeInOutQuad = [];
        for (let i = 0; i < steps + 1; i++) {
            const stepValue = easeInOutQuad(i, 0, speed, steps);
            this.easeInOutQuad.push(stepValue);
        }
        this.easeOutQuad = [];
        for (let i = 0; i < steps + 1; i++) {
            const stepValue = easeInOutQuad(i, 0, speed, steps);
            this.easeOutQuad.push(stepValue);
        }
        this.count = 0;
    }
    render() {
        // Square the SVG box and subtract margins

        const outerWidth = { width: this.props.width };

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
                {/* <h1
                    onClick={(e) => this.handleLogoClick(e)}
                    id="logoName"
                    style={pos}
                    className={style.logoName}
                >
                    {this.state.size === "small" ? "Zen Streak" : "ZD"}
                </h1> */}
            </div>
        );
    }
}

export default Logo;
