import React from "react";

class Logout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showLogout: false,
        };
    }
    handleLogout(e) {
        console.log("Logout");
        e.preventDefault();

        this.setState({ showLogout: !this.state.showLogout });
    }

    render() {
        return (
            <div className={this.props.class}>
                <form>
                    {this.state.showLogout ? (
                        <>
                            <button onClick={(e) => this.handleLogout(e)}>
                                Cancel
                            </button>{" "}
                            <a href="/logout" role="button">
                                Confirm
                            </a>
                        </>
                    ) : (
                        <button onClick={(e) => this.handleLogout(e)}>
                            Logout
                        </button>
                    )}
                </form>
            </div>
        );
    }
}
export default Logout;
