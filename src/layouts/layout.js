import React from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import style from "../css/layout.module.css";

const Layout = ({ children }) => {
    return (
        <div className={style.layout}>
            <Header />

            <main className="glass">{children}</main>

            <Footer />
        </div>
    );
};

export default Layout;
