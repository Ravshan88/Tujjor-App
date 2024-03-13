import React from 'react';
import LogoImage from 'images/logo.jpg';
import { useNavigate } from "react-router-dom";

function Index() {
    const navigate = useNavigate();

    return (
        <div
            className="py-1 px-2 d-flex justify-content-center align-items-center"
            style={{
                width: "10%", // Adjusted width for responsiveness
                backgroundColor: "#1E2328",
            }}
        >
            <img
                src={LogoImage}
                alt="logo"
                id='logo_main'
                style={{ objectFit: "contain" }}
                onClick={() => navigate("/admin")}
            />
        </div>
    );
}

export default Index;
