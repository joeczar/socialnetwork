import React from "react";
import axios from "../helpers/axios";
import Errors from "./errors";
import style from "../css/register.module.css";

export default class ResetPasswordEmail extends React.Component {
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
        const { email } = this.state;
        axios
            .post(
                "/reset",
                {
                    email,
                },
                {
                    xsrfCookieName: "token",
                    xsrfHeaderName: "csrf-token",
                }
            )
            .then(({ data }) => {
                console.log(data);
                if (data.success) {
                    this.setState({ step: 1 });
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
        const { step } = this.state;
        if (step == 1) {
            return (
                <div id="resetPassWrapper" className={style.register}>
                    <h2>Reset Password</h2>
                    <p>Please enter the email address you signed up with.</p>
                    <Errors errors={this.state.errors} />
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
                    <button onClick={() => this.submit()}>Submit</button>
                </div>
            );
        } else if (step == 2) {
            return <div></div>;
        } else {
            return <div></div>;
        }
    }
}
