import React from "react";
import axios from "../helpers/axios";
import style from "../css/register.module.css";
import Errors from "../components/errors";
import { Link } from "react-router-dom";

export default class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: [],
        };
    }
    handleChange(e) {
        // this[e.target.name] = e.target.value
        this.setState({
            [e.target.name]: e.target.value,
        });
    }
    async submit(e) {
        e.preventDefault();
        
        const { first, last, email, pass } = this.state;
       
        try {
            console.log('in try');
            const { data } = await axios.post(
                "/register",
                {
                    first,
                    last,
                    email,
                    pass,
                },
                {
                    xsrfCookieName: "token",
                    xsrfHeaderName: "csrf-token",
                }
            );
            console.log('submit data', data);
            if (data.success) {
                console.log("data.success", data);
                location.replace("/");
            } else {
                console.log("errors", data);
                this.setState({
                    errors: [...data.errors],
                });
            }
            console.log("axios res", data);
        } catch (err) {
            console.log("Error in submit", err);
            const errors = [err.message];
            this.setState({ errors: errors });
        }
    }
    render() {
        return (
            <div id="registrationWrapper" className={style.register}>
                <Errors errors={this.state.errors} />
                <form>
                    <label htmlFor="first">
                        First Name
                        <input
                            onChange={(e) => this.handleChange(e)}
                            name="first"
                            id="first"
                            type="text"
                            placeholder="Enter your first name"
                            required
                        />
                    </label>
                    <label htmlFor="last">
                        Last Name
                        <input
                            onChange={(e) => this.handleChange(e)}
                            name="last"
                            id="last"
                            type="text"
                            placeholder="Enter your last name"
                            required
                        />
                    </label>
                    <label htmlFor="email">
                        Email
                        <input
                            onChange={(e) => this.handleChange(e)}
                            name="email"
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            required
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
                            required
                        />
                    </label>

                    <button onClick={(e) => this.submit(e)}>Submit</button>
                </form>
                <Link to="login">Log in</Link>
            </div>
        );
    }
}
