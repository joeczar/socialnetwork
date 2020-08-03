import React, { Component } from "react";

export default class BioEditor extends Component {
    constructor() {
        super();
        this.state = {
            editMode: false,
        };
    }
    render() {
        return (
            <div>
                <h1>Bio</h1>
            </div>
        );
    }
}
