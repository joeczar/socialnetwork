import React, { Component } from "react";
import axios from "axios";

/////////////////  COMPONENTS  ////////////////////
import Layout from "./layouts/layout";
import ImageUpload from "./components/imageUpload"
///////////////  CSS  //////////////////
import style from "./css/app.module.css";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toggleUploadModal: false,
        };
        this.toggleUploadModal = this.toggleUploadModal.bind(this)
    }
    componentDidMount() {
        console.log("App has mounted");
        axios.get("/user");
    }
    toggleUploadModal(e) {
        console.log(e.target);
        this.setState({
            toggleUploadModal: !this.state.toggleUploadModal
        }, () => {
            console.log('upload toggled to:', this.state.toggleUploadModal);
        }
        );
        
    }
    // <ImageUpload toggleModal={this.toggleUploadModal}/>
    render() {
        return (
            <Layout toggleUpload={this.toggleUploadModal}>
               
                <h1>App</h1>
                <p>Hi! {`$`} </p>
                
                {this.state.toggleUploadModal && <ImageUpload toggleModal={this.toggleUploadModal}/>}
              
            </Layout>
        );
    }
}

export default App;
