import React from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import style from "../css/layout.module.css";

const Layout = ({ children, toggleUpload, name, url }) => {
    console.log("layout ", name, url);
    return (
        <div className={`layout ${style.layout}`}>
            <Header toggleUpload={toggleUpload} name={name} url={url} />

            <main>{children}</main>

            <Footer />
        </div>
    );
};

export default Layout;
