import { usePage } from "@inertiajs/react";
import React, { useState } from "react";

const Logo = ({ color }) => {
    const { props } = usePage();
    const user = props.auth.user;
    const home = user && user.role == 'beneficiary' ? '/' : user && user.role == 'admin' ? '/admin/beneficiaries' : user && user.role == 'dswd' ? '/dswd/dashboard' : user && user.role == 'Barangay'? '/barangay/dashboard' : '/';

    return (
        <div className="logo">
            <a href={home} className="font-bold text-2xl font-font1Smbd">
                <div className="w-40 lg:w-56">
                    <img src={`${window.location.origin}/assets/logo-${color}.png`} alt="blockaid_logo" className="w-full h-full object-cover" />
                </div>
            </a>
        </div>
    );
};

export default Logo;
