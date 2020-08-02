import React from "react";
import axios from "../helpers/axios";
import Errors from "./errors";
import style from "../css/register.module.css";

export default class ResetPasswordEmail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: [],
            step: 0,
        };
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }
    async submit(e) {
        e.preventDefault();
        const { email } = this.state;
        try {
            const { data } = await axios.post(
                "/resetpassword",
                {
                    email,
                },
                {
                    xsrfCookieName: "token",
                    xsrfHeaderName: "csrf-token",
                }
            );

            console.log(data);
            if (data.success) {
                this.setState({ step: 1 });
            } else {
                console.log(data.errors);
                this.setState({
                    errors: [data.errors],
                });
            }
        } catch (err) {
            console.log("Error in submit", err.message);
            this.setState({ errors: ["That didn't work"] });
        }
    }
    submitCode(e) {
        e.preventDefault();
        const { code, password, email } = this.state;
        try {
            const { data } = axios.post(
                "/entercode",
                { code, password, email },
                {
                    xsrfCookieName: "token",
                    xsrfHeaderName: "csrf-token",
                }
            );
            console.log(data);
            if (data.success) {
                this.setState({ step: 2 });
            } else {
                this.setState({
                    errors: [...data.errors],
                });
            }
        } catch (err) {
            console.log("error in submitCode", err);
        }
    }
    render() {
        const { step } = this.state;
        console.log(step);
        if (step === 0) {
            return (
                <div id="resetPassWrapper" className={style.register}>
                    <h2>Reset Password</h2>
                    <p>Please enter the email address you signed up with.</p>
                    <form>
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
                        <button onClick={(e) => this.submit(e)}>Submit</button>
                    </form>
                </div>
            );
        } else if (step === 1) {
            return (
                <div>
                    <h2>Enter your Code</h2>
                    <p>Please enter the code you recieved via Email</p>
                    <form>
                        <Errors errors={this.state.errors} />
                        <label htmlFor="code">
                            Code
                            <input
                                onChange={(e) => this.handleChange(e)}
                                name="code"
                                id="code"
                                type="text"
                                placeholder="Enter your code"
                            />
                        </label>
                        <label htmlFor="code">
                            Password
                            <input
                                onChange={(e) => this.handleChange(e)}
                                name="password"
                                id="password"
                                type="password"
                                placeholder="Enter your Password"
                            />
                        </label>
                        <button onClick={(e) => this.submitCode(e)}>
                            Submit
                        </button>
                    </form>
                </div>
            );
        } else {
            return (
                <div>
                    <h1></h1>
                </div>
            );
        }
    }
}
