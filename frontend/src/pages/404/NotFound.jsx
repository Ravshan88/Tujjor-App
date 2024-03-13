import React from "react";
import './NotFound.css'
import {useNavigate} from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();
    return (
        <div id="notfound">
            <div class="notfound">
                <div class="notfound-404">
                    <h1>Oops!</h1>
                </div>
                <h2>404 - Page not found</h2>
                <p>
                    The page you are looking for might have been removed had its name
                    changed or is temporarily unavailable.
                </p>
                <p onClick={() => navigate(-1)}>Go To Homepage</p>
            </div>
        </div>
    );
};

export default NotFound;