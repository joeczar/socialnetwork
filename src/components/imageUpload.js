import React, { Component } from 'react'

import style from '../css/uploader.module.css'

class ImageUploader extends Component {
    constructor(props) {
        super(props)
        this.state = {
            
        }
    }

    render() {
        return (
            <div onClick={e => this.props.toggleModal(e)} className={style.modal}>
                <div id="uploadWrapper" className={style.uploader}>
                    <h1>Upload yer Pic!</h1>
                </div>
            </div>
        )
    }
}

export default ImageUploader