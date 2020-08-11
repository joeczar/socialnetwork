import React, { Component } from "react";
import axios from "../helpers/axios";

////////////////  COMPONENTS  /////////////////
import CloseX from "./closeX";
import ProfilePic from "./profilePic";

import style from "../css/uploader.module.css";

class Uploader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            errors: [],
        };
    }
    handleChange(e) {
        this.setState({
            file: e.target.files[0],
        });
    }
    async handleClick(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", this.state.file);
        try {
            const { data } = await axios.post("/upload-pic", formData, {
                xsrfCookieName: "token",
                xsrfHeaderName: "csrf-token",
            });
            if (data.success) {
                this.props.updateUrl(data.url.pic_url);
                this.props.toggleModal();
            } else {
                this.setState({ errors: data.errors });
            }
        } catch (err) {
            console.log("error in upload pic axios", err);
        }
    }
    render() {
        const { name, url, toggleModal } = this.props;
        return (
            <div className={style.modal}>
                <div id="uploadWrapper" className={style.uploader}>
                    <CloseX close={(e) => toggleModal(e)} />
                    <ProfilePic
                        name={name}
                        url={url}
                        close={null}
                        size="medium"
                    />
                    <h1>Change your profile picture</h1>
                    <form>
                        <label
                            htmlFor="image_uploads"
                            className={style.uploadLabel}
                        >
                            Choose an image
                        </label>
                        <input
                            onChange={(e) => this.handleChange(e)}
                            type="file"
                            id="image_uploads"
                            name="image_uploads"
                            accept="image/*"
                            className={style.uploadInput}
                        />
                        <button
                            onClick={(e) => this.handleClick(e)}
                            className={style.btn}
                        >
                            submit
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Uploader;
