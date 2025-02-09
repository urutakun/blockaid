import React from "react";

const Logo = ({ size }) => {
    return (
        <div className="logo">
            <a href="/" className="font-bold text-2xl font-font1Smbd">
                <div style={{ width: `${size}px`}}>
                    <img src={`${window.location.origin}/assets/logo.png`} alt="blockaid_logo" className="w-full h-full object-cover" />
                </div>
            </a>
        </div>
    );
};

export default Logo;
