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
    async submit(e) {
        e.preventDefault();
        const { email, pass } = this.state;

        try {
            const { data } = await axios.post("/login", { email, pass });
            if (data.success) {
                location.replace("/");
            } else {
                this.setState({
                    errors: [...data.errors],
                });
            }
        } catch (err) {
            console.log("Error in submit", err);
            this.setState({ errors: [`Something went wrong`] });
        }
    }
    render() {
        return (
            <div id="registrationWrapper" className={style.register}>
                <h1>Login</h1>
                {this.state.errors.length > 0 &&
                    this.state.errors.map((err, key) => {
                        return (
                            <div className="error" key={key}>
                                {err}
                            </div>
                        );
                    })}
                <form>
                    <label htmlFor="email">Email</label>
                    <input
                        onChange={(e) => this.handleChange(e)}
                        name="email"
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        required
                    />

                    <label htmlFor="pass">Password</label>
                    <input
                        onChange={(e) => this.handleChange(e)}
                        name="pass"
                        id="pass"
                        type="password"
                        placeholder="Password must be at least 8 characters"
                        required
                    />

                    {/* <input name="csurf" id="pass" type="hidden" /> */}
                    <button onClick={(e) => this.submit(e)}>Submit</button>
                    <p>
                        Forgot your password? <br />
                        Reset it <Link to="/reset">here</Link>
                    </p>
                </form>
            </div>
        );
    }
}
