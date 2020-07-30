import React from "react";
import axios from "../helpers/axios";
import style from "../css/register.module.css";
import { Link } from "react-router-dom";

export default class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: [],
        };
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }
    submit() {
        const { email, pass } = this.state;
        axios
            .post(
                "/login",
                {
                    email,
                    pass,
                },
                {
                    xsrfCookieName: "token",
                    xsrfHeaderName: "csrf-token",
                }
            )
            .then(({ data }) => {
                console.log(data);
                if (data.success) {
                    location.replace("/");
                } else {
                    this.setState({
                        errors: [...data.errors],
                    });
                }
            })
            .catch((err) => {
                console.log("Error in submit", err);
                this.setState({ errors: [`Something went wrong`] });
            });
    }
    render() {
        return (
            <div id="registrationWrapper" className={style.register}>
                <h2>Login</h2>
                {this.state.errors.length > 0 &&
                    this.state.errors.map((err, key) => {
                        return (
                            <div className="error" key={key}>
                                {err}
                            </div>
                        );
                    })}

                <label htmlFor="email">
                    Email
                    <input
                        onChange={(e) => this.handleChange(e)}
                        name="email"
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                    />
                </label>
                <label htmlFor="pass">
                    Password
                    <input
                        onChange={(e) => this.handleChange(e)}
                        name="pass"
                        id="pass"
                        type="password"
                        placeholder="Password must be at least 8 characters"
                    />
                </label>
                {/* <input name="csurf" id="pass" type="hidden" /> */}
                <button onClick={() => this.submit()}>Submit</button>
                <p>
                    Forgot your password? <br />
                    Click <Link to="/reset">here</Link> to reset it.
                </p>
            </div>
        );
    }
}
