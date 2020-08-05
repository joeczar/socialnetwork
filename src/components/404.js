import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div>
            <h1>Hmmm... We couldn&apos;t find that</h1>
            <h2>404 Page not found</h2>
            <Link to="/">Go Home</Link>
        </div>
    );
}
