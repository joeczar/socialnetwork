import React, { Component } from 'react'
import axios from '../helpers/axios'
import ProfilePic from './profilePic'
import style from '../css/otherProfile.module.css'

export default class OtherProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            url: "",
            bio: "",
        }
    }
    async componentDidMount() {
        const id = this.props.match.params.id
        console.log('in cdm otherprofile this.props.match.params.id', id);
        try {
            const {data} = await axios.get(`/other-user/${id}`)
            const { first, last, pic_url, bio } = data
            this.setState({ name: {first, last}, url: pic_url, bio: bio })
        console.log('in cdm otherprofile axios response', data);
        }   catch (err) {
            console.log('error in get other-profile', err);
        }
        
    }
    
    render() {
        const {name, url, bio} = this.state
        return (
            <div className={style.otherProfile}>
                <ProfilePic
                    name={name}
                    url={url}
                    toggleUpload={null}
                    size="large"
                />
                <div className={style.bio}>
                    <h2>Bio</h2>
                    <p>{bio}</p>
                </div>
            </div>
        )
    }
}
