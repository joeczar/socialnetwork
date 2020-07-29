import React from 'react'
import Greetee from './gretee'


export default class Hello extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            greeteeName: 'World',
            day: 'Wednesday'
        };
    }
    handleChange(newGreeteeName) {
        this.setState({
            greeteeName: newGreeteeName
        });
    }
    render() {
        const className = "cute"
        const {greeteeName, day} = this.state
        return (
            <div className={className}>
                Hello, <Greetee name={greeteeName} />!
        <p>Today is {day}</p>
                <div>
                    <input onChange={
                        e => this.handleChange(e.target.value)
                        } defaultValue={greeteeName} />
                </div>
            </div>
        );
    }
}