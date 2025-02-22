import React from "react";
import MobileNavLink from "./MobileNavLink";
import Logo from "./Logo";
import { useForm } from "@inertiajs/react";
import { AnimatePresence, motion } from "motion/react";
import { easeIn, easeInOut, easeOut } from "motion";

const MobileNav = ({ user, setIsClicked }) => {
    const { post } = useForm();

    const handleCloseClick = () => {
        setIsClicked(false);
    };

    const date = new Date();
    const year = date.getFullYear();

    const navVariant = {
        initial: {
            scaleY: 0,
            transformOrigin: "top"
        },
        animate: {
            scaleY: 1,
            transformOrigin: "top",
            transition: {
                duration: 0.3,
                ease: [0.12, 0, 0.39, 0],
            }
        },
        exit: {
            scaleY: -5,
            transition: {
                delay: 0.1,
                duration: 0.9,
                ease: [0.12, 0, 0.39, 1],
            }
        }
    }

    const logoutVarants = {
        initial: {
            y: "30vh",
            transition: {
                duration: 0.5,
                ease: [0.37, 0, 0.63, 1]
            }
        },
        animate: {
            y: 0,
            transition: {
                delay: 0.4,
                duration: 0.7,
                ease: [0, 0.55, 0.45, 1]
            }
        },
        exit: {
            y: "30vh",
            transition: {
                duration: 0.7,
                ease: [0.37, 0, 0.63, 1]
            }
        }
    }

    const containerVariants = {
		hidden: { opacity: 0 },
		show: (delay) => ({
		opacity: 1,
			transition: {
			staggerChildren: 0.2,
			delayChildren: delay,
			ease: "easeInOut",
		},
	}),
};


    return (
            <motion.div
                variants={navVariant}
                initial="initial"
                animate="animate"
                exit="exit"
                className={`mobile__nav w-full h-screen bg-cblack fixed inset-0 ctransition flex flex-col items-center md:hidden z-10 p-6 origin-top`}
            >
               <div className="header flex items-center justify-between w-full">
                <Logo color='dark'/>
                <div className="exit uppercase cursor-pointer hover:underline font-bold text-cwhite" onClick={handleCloseClick}><p>close</p></div>
               </div>
                    <ul
                    className="mobile__nav-links text-6xl text-center font-bold font-font1Smbd space-y-8 mt-32 w-full px-14">
                        {(!user || (user && user.role === "beneficiary")) && (
                            <>
                                <div className="overflow-hidden py-2">
                                    <MobileNavLink action="track" name="track relief" />
                                </div>
                                <div className="overflow-hidden py-2">
                                    <MobileNavLink action="contact" name="contact us" />
                                </div>
                            </>
                        )}
                        {user && user.role === "admin" && (
                            <>
                            <div className="overflow-hidden py-2">
                                <MobileNavLink
                                    action="admin/beneficiaries"
                                    name="beneficiaries"
                                />
                            </div>
                            <div className="overflow-hidden py-2">
                                <MobileNavLink
                                    action="admin/user-management"
                                    name="user management"
                                />
                            </div>
                            <div className="overflow-hidden py-2">
                                <MobileNavLink
                                    action="admin/transactions"
                                    name="transactions"
                                />
                            </div>
                            </>
                        )}

                        {user && user.role == 'dswd' && (
                        <>
                            <div className="overflow-hidden py-2">
                                <MobileNavLink name="shipments" action="dswd/shipments"/>
                            </div>
                            <div className="overflow-hidden py-2">
                                <MobileNavLink name="transactions" action="dswd/transactions"/>
                            </div>
                            <div className="overflow-hidden py-2">
                                <MobileNavLink name="reports" action="dswd/reports"/>
                            </div>
                        </>
                    )}
                        {user && (
                            <>
                                <div className="overflow-hidden py-2">
                                    <MobileNavLink action="profile" name="profile" />
                                </div>
                                <div className="overflow-hidden py-2">
                                    <motion.div
                                        onClick={(e) => {
                                            e.preventDefault();
                                            post("/logout");
                                        }}
                                        variants={logoutVarants}
                                        initial="initial"
                                        animate="animate"
                                        exit="exit"
                                        className="flex justify-center items-center cursor-pointer hover:text-cgreen hover:underline text-cwhite"
                                    >
                                        <p>Logout</p>
                                    </motion.div>
                                </div>
                            </>
                        )}
                    </ul>

                <p className="text-sm text-center text-cwhite absolute left-1/2 -translate-x-1/2 bottom-8">
                    &copy; Copyright {year} By Blockaid x uruta 💚
                </p>
            </motion.div>
    );
};

export default MobileNav;
