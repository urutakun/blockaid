import React, { useState } from "react";
import Nav from "./components/Nav";
import NavLink from "./components/NavLink";
import { QRCodeCanvas } from "qrcode.react";
import { usePage } from "@inertiajs/react";
import EditProfile from "./components/EditProfile";

const Profile = () => {
    const { props } = usePage();
    const user = props.auth.user;
    const [isEditClicked, setIsEditClicked] = useState(false);

    const full_name = `${user.first_name} ${user.middle_name !== null ? user.middle_name : ''} ${user.last_name !== null ? user.last_name : ''}`;
    const date = new Date(user.birthday);
    const birthday = `${date.toLocaleString('en-US', {month: 'long'})} ${date.getDate()}, ${date.getFullYear()}`

    const qr_data = JSON.stringify({
        id: user.id,
        name: full_name,
        email: user.email,
        birthday: user.birthday,
        mobile: user.mobile,
    });

    return (
        <div>
            <Nav>
                <NavLink name={'track relief'} action={'track'} icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M11.669 2.282c.218-.043.443-.043.662 0c.251.048.479.167.691.277l.053.028l8.27 4.28a.75.75 0 0 1 .405.666v7.898c0 .283.002.583-.093.862a1.8 1.8 0 0 1-.395.652c-.205.214-.473.351-.723.48l-.063.033l-8.131 4.208a.75.75 0 0 1-.69 0l-8.131-4.208l-.063-.033c-.25-.129-.518-.266-.723-.48a1.8 1.8 0 0 1-.395-.652c-.095-.28-.094-.58-.093-.863V7.533a.75.75 0 0 1 .405-.666l8.269-4.28l.053-.027c.213-.111.44-.23.692-.278m.226 1.496a7 7 0 0 0-.282.141L4.668 7.514L12 11.102l7.332-3.588l-6.946-3.595a7 7 0 0 0-.282-.141l-.058-.024m-.796 16.013v-7.362l-7.5-3.67v6.624c0 .187 0 .294.005.375l.009.078a.3.3 0 0 0 .057.095c.005.004.021.017.064.042c.068.042.163.09.328.176zm.645-15.99l.06-.023z"/></svg>}/>
                <NavLink name={'live alerts'} action={'live-alert'} icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 496 512"><path fill="currentColor" d="M248 8C111.03 8 0 119.03 0 256s111.03 248 248 248s248-111.03 248-248S384.97 8 248 8m-11.34 240.23c-2.89 4.82-8.1 7.77-13.72 7.77h-.31c-4.24 0-8.31 1.69-11.31 4.69l-5.66 5.66c-3.12 3.12-3.12 8.19 0 11.31l5.66 5.66c3 3 4.69 7.07 4.69 11.31V304c0 8.84-7.16 16-16 16h-6.11c-6.06 0-11.6-3.42-14.31-8.85l-22.62-45.23c-2.44-4.88-8.95-5.94-12.81-2.08l-19.47 19.46c-3 3-7.07 4.69-11.31 4.69H50.81C49.12 277.55 48 266.92 48 256c0-110.28 89.72-200 200-200c21.51 0 42.2 3.51 61.63 9.82l-50.16 38.53c-5.11 3.41-4.63 11.06.86 13.81l10.83 5.41c5.42 2.71 8.84 8.25 8.84 14.31V216c0 4.42-3.58 8-8 8h-3.06c-3.03 0-5.8-1.71-7.15-4.42c-1.56-3.12-5.96-3.29-7.76-.3zM408 358.43c0 4.24-1.69 8.31-4.69 11.31l-9.57 9.57c-3 3-7.07 4.69-11.31 4.69h-15.16c-4.24 0-8.31-1.69-11.31-4.69l-13.01-13.01a26.77 26.77 0 0 0-25.42-7.04l-21.27 5.32c-1.27.32-2.57.48-3.88.48h-10.34c-4.24 0-8.31-1.69-11.31-4.69l-11.91-11.91a8 8 0 0 1-2.34-5.66v-10.2c0-3.27 1.99-6.21 5.03-7.43l39.34-15.74c1.98-.79 3.86-1.82 5.59-3.05l23.71-16.89a8 8 0 0 1 4.64-1.48h12.09c3.23 0 6.15 1.94 7.39 4.93l5.35 12.85a4 4 0 0 0 3.69 2.46h3.8c1.78 0 3.35-1.18 3.84-2.88l4.2-14.47c.5-1.71 2.06-2.88 3.84-2.88h6.06c2.21 0 4 1.79 4 4v12.93c0 2.12.84 4.16 2.34 5.66l11.91 11.91c3 3 4.69 7.07 4.69 11.31v24.6z"/></svg>}/>
            </Nav>
            <div className="profile-wrapper h-full  mt-16 grid grid-cols-2 px-6 lg:w-[70vw] mx-auto pb-6 items-center">
                <div className="id flex flex-col justify-center items-center p-8 col-span-2 lg:col-span-1">
                    <div className="profile_image">
                        <div className="profile_image_wrapper overflow-hidden rounded-full w-[150px] h-[150px] md:w-[200px] md:h-[200px] mb-6 border border-gray-500">
                            {/* FIX THE IMAGE IN THE NAV SECTION */}
                            <img
                                src={user && `${window.location.origin}/storage/uploads/${user.image}`}
                                alt="profile"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                    <div className="details text-center space-y-4 mb-16">
                        <p className="text-5xl font-bold capitalize lg:px-10">
                            {full_name}
                        </p>
                        <button className="px-4 py-1 text-base bg-clgreen rounded-full border border-cblack ctransition hover:bg-cgreen" onClick={() => setIsEditClicked(true)}>
                            Edit Profile
                        </button>
                    </div>
                    <div className="qr">
                        {user.role === 'beneficiary' && (
                            <QRCodeCanvas
                                value={qr_data}
                                size={250}
                                fgcolor="#101010"
                                bgColor="#F5F4F4"
                            />
                        )}
                    </div>
                </div>
                <div className="info mt-16 lg:mt-0 col-span-2 lg:col-span-1">
                    <div className="info-block w-full mb-8">
                        <label htmlFor="name" className="mb-8">Name:</label>
                        <p id="name" className="capitalize py-2 border border-cblack rounded-lg px-2 mt-4">
                            {full_name}
                        </p>
                    </div>
                    <div className="info-block w-full mb-8">
                        <label htmlFor="email" className="mb-8">Email:</label>
                        <p id="email" className="py-2 border border-cblack rounded-lg px-2 mt-4">
                            {user.email}
                        </p>
                    </div>
                    <div className={`info-block w-full mb-8 ${user.birthday == null ? 'hidden' : ''}`}>
                        <label htmlFor="birthday" className="mb-8">Birthday:</label>
                        <p id="birthday" className="py-2 border border-cblack rounded-lg px-2 mt-4">
                            {birthday}
                        </p>
                    </div>
                    <div className={`info-block w-full mb-8 ${user.mobile == null ? 'hidden' : ''}`}>
                        <label htmlFor="mobile" className="mb-8">Phone Number:</label>
                        <p id="mobile" className="py-2 border border-cblack rounded-lg px-2 mt-4">
                            {user.mobile}
                        </p>
                    </div>
                </div>
            </div>
            <EditProfile isEditClicked={isEditClicked} setIsEditClicked={setIsEditClicked} user={user}/>
        </div>
    );
};

export default Profile;
