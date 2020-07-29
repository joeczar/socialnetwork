import React from 'react';
import axios from 'axios';

export default class Registration extends React.Component {
    constructor(props) {
        suoer(props);
        this.state = {
            register: {}
        };
        
    }
    handleChange(e) {
        // this[e.target.name] = e.target.value
        this.setState({
            register:{
                [e.target.name]: e.target.value
            },
            
        })
    }
    submit() {
        
        const register = this.state.register
        axios.post('/register', {
            register
        }).then((params) => {
            this.setState({ error: true})
        }
        ).catch((err) => {
            console.log('Error in submit', err);
            this.setState({ error: true})
        }
        )
    }
    render() {
        return(
            <div>
                <input onChange={e => this.handleChange(e)} name="last" />
                <input onChange={e => this.handleChange(e)} name="first" />
                <input onChange={e => this.handleChange(e)} name="email" />
                <input onChange={e => this.handleChange(e)} name="pass" />
                <button onClick={e => this.submit()}>Submit</button>
            </div>
        )
    }
}
