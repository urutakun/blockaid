import { Link, useForm, usePage } from "@inertiajs/react";
import React, { useState } from "react";
import NavLink from "./NavLink";
import Logo from "./Logo";
import MobileNav from "./MobileNav";
import { AnimatePresence, motion } from "motion/react";

const Nav = () => {
  const { url, props } = usePage();
  const user = props.auth.user;
  const role = user ? user.role : "";
  const [isClicked, setIsClicked] = useState(false);
  const [isProfileClicked, setIsProfileClicked] = useState(false);
  const date = new Date();
  const { post } = useForm();

  const handleOpenClick = () => {
    setIsClicked(true);
  };

  const navVariants = {
    hide: {
      x: 100,
    },
    show: {
      x: 0,
      transition: {
        type: "tween",
        duration: 0.5,
      },
    },
    exit: {
      x: 100,
    },
  };

  const noAnimationRoles = ["admin", "dswd", "bdrrm"];

  return (
    <motion.div
      initial={
        !noAnimationRoles.includes(role) && url === "/" ? { opacity: 0 } : {}
      }
      animate={
        !noAnimationRoles.includes(role) && url === "/"
          ? {
              opacity: 1,
              transition: {
                duration: 1.2,
                delay: 1.3,
                ease: [0, 0.55, 0.45, 1],
              },
            }
          : {}
      }
    >
      <AnimatePresence>
        {isClicked && <MobileNav setIsClicked={setIsClicked} user={user} />}
      </AnimatePresence>
      <div className="desktop__nav w-full flex justify-between px-6 py-6 items-center ctransition">
        <div className="group__sec-1 flex items-center md:space-x-4 lg:space-x-20">
          <Logo color="light" />
          <div className="sec__2 hidden md:block">
            <ul className="flex flex-wrap lg:space-x-6">
              {(!user || (user && user.role === "beneficiary")) && (
                <>
                  <NavLink
                    name="track relief"
                    action="track"
                    icon={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M11.669 2.282c.218-.043.443-.043.662 0c.251.048.479.167.691.277l.053.028l8.27 4.28a.75.75 0 0 1 .405.666v7.898c0 .283.002.583-.093.862a1.8 1.8 0 0 1-.395.652c-.205.214-.473.351-.723.48l-.063.033l-8.131 4.208a.75.75 0 0 1-.69 0l-8.131-4.208l-.063-.033c-.25-.129-.518-.266-.723-.48a1.8 1.8 0 0 1-.395-.652c-.095-.28-.094-.58-.093-.863V7.533a.75.75 0 0 1 .405-.666l8.269-4.28l.053-.027c.213-.111.44-.23.692-.278m.226 1.496a7 7 0 0 0-.282.141L4.668 7.514L12 11.102l7.332-3.588l-6.946-3.595a7 7 0 0 0-.282-.141l-.058-.024m-.796 16.013v-7.362l-7.5-3.67v6.624c0 .187 0 .294.005.375l.009.078a.3.3 0 0 0 .057.095c.005.004.021.017.064.042c.068.042.163.09.328.176zm.645-15.99l.06-.023z"
                        />
                      </svg>
                    }
                  />
                  <NavLink
                    name="live alert"
                    action="live-alert"
                    icon={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 0 1-1.161.886l-.143.048a1.107 1.107 0 0 0-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 0 1-1.652.928l-.679-.906a1.125 1.125 0 0 0-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 0 0-8.862 12.872M12.75 3.031a9 9 0 0 1 6.69 14.036m0 0-.177-.529A2.25 2.25 0 0 0 17.128 15H16.5l-.324-.324a1.453 1.453 0 0 0-2.328.377l-.036.073a1.586 1.586 0 0 1-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 0 1-5.276 3.67m0 0a9 9 0 0 1-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25"
                        />
                      </svg>
                    }
                  />
                </>
              )}

              {user && role === "admin" && (
                <>
                  <NavLink
                    name="beneficiaries"
                    action="admin/beneficiaries"
                    icon={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M21.987 18.73a2 2 0 0 1-.34.85a1.9 1.9 0 0 1-1.56.8h-1.651a.74.74 0 0 1-.6-.31a.76.76 0 0 1-.11-.67c.37-1.18.29-2.51-3.061-4.64a.77.77 0 0 1-.32-.85a.76.76 0 0 1 .72-.54a7.61 7.61 0 0 1 6.792 4.39a2 2 0 0 1 .13.97M19.486 7.7a4.43 4.43 0 0 1-4.421 4.42a.76.76 0 0 1-.65-1.13a6.16 6.16 0 0 0 0-6.53a.75.75 0 0 1 .61-1.18a4.3 4.3 0 0 1 3.13 1.34a4.46 4.46 0 0 1 1.291 3.12z"
                        />
                        <path
                          fill="currentColor"
                          d="M16.675 18.7a2.65 2.65 0 0 1-1.26 2.48c-.418.257-.9.392-1.39.39H4.652a2.63 2.63 0 0 1-1.39-.39A2.62 2.62 0 0 1 2.01 18.7a2.6 2.6 0 0 1 .5-1.35a8.8 8.8 0 0 1 6.812-3.51a8.78 8.78 0 0 1 6.842 3.5a2.7 2.7 0 0 1 .51 1.36M14.245 7.32a4.92 4.92 0 0 1-4.902 4.91a4.903 4.903 0 0 1-4.797-5.858a4.9 4.9 0 0 1 6.678-3.57a4.9 4.9 0 0 1 3.03 4.518z"
                        />
                      </svg>
                    }
                  />
                  <NavLink
                    name="user management"
                    action="admin/user-management"
                    icon={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <circle cx="12" cy="6" r="4" fill="currentColor" />
                        <path
                          fill="currentColor"
                          d="M20 17.5c0 2.485 0 4.5-8 4.5s-8-2.015-8-4.5S7.582 13 12 13s8 2.015 8 4.5"
                        />
                      </svg>
                    }
                  />
                  <NavLink
                    name="transactions"
                    action="admin/transactions"
                    icon={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M12 22c.244 0 .471-.113.926-.34l3.65-1.817C18.193 19.04 19 18.637 19 18v-8m-7 12c-.244 0-.471-.113-.926-.34l-3.65-1.817C5.807 19.04 5 18.637 5 18v-8m7 12v-8m7-4c0-.637-.808-1.039-2.423-1.843l-3.651-1.818C12.47 6.113 12.244 6 12 6s-.471.113-.926.34l-3.65 1.817C5.807 8.96 5 9.363 5 10m14 0c0 .637-.808 1.039-2.423 1.843l-3.651 1.818c-.455.226-.682.339-.926.339m-7-4c0 .637.808 1.039 2.423 1.843l3.651 1.818c.455.226.682.339.926.339m10 7l-3-2.5M12 2v4M2 21l3-2.5"
                          color="currentColor"
                        />
                      </svg>
                    }
                  />
                </>
              )}

              {user && role == "dswd" && (
                <>
                  <NavLink
                    name="shipments"
                    action="dswd/shipments"
                    icon={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          fillRule="evenodd"
                          d="M2 2a1 1 0 0 0-1 1v14c0 1.354.897 2.498 2.129 2.872a3 3 0 0 0 5.7.128h6.342a3 3 0 0 0 5.7-.128A3 3 0 0 0 23 17v-4a5 5 0 0 0-5-5h-4V3a1 1 0 0 0-1-1zm13.171 16H14v-8h4a3 3 0 0 1 3 3v4a1 1 0 0 1-.293.707a3 3 0 0 0-5.536.293m-9.878.293a1 1 0 1 1 1.414 1.414a1 1 0 0 1-1.414-1.414M17 19a1 1 0 1 1 2 0a1 1 0 0 1-2 0"
                          clipRule="evenodd"
                        />
                      </svg>
                    }
                  />
                  <NavLink
                    name="reports"
                    action="dswd/reports"
                    icon={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fill="currentColor"
                          d="M8.8 0c.274 0 .537.113.726.312l3.2 3.428c.176.186.274.433.274.689V13a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V1a1 1 0 0 1 1-1zM12 5H8.5a.5.5 0 0 1-.5-.5V1H2v12h10zm-7.5 6a.5.5 0 1 1 0-1h5a.5.5 0 1 1 0 1zm0-3a.5.5 0 0 1 0-1h5a.5.5 0 1 1 0 1zm1 8a.5.5 0 1 1 0-1H14V6.5a.5.5 0 1 1 1 0V15a1 1 0 0 1-1 1z"
                        />
                      </svg>
                    }
                  />
                </>
              )}

              {user && role == "bdrrm" && (
                <>
                  <NavLink
                    name="request"
                    action="bdrrm/request"
                    icon={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 6.878V6a2.25 2.25 0 0 1 2.25-2.25h7.5A2.25 2.25 0 0 1 18 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 0 0 4.5 9v.878m13.5-3A2.25 2.25 0 0 1 19.5 9v.878m0 0a2.246 2.246 0 0 0-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0 1 21 12v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6c0-.98.626-1.813 1.5-2.122"
                        />
                      </svg>
                    }
                  />
                  {/* <NavLink name="scan" action="bdrrm/scan" icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 3.75 9.375v-4.5ZM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 0 1-1.125-1.125v-4.5ZM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 13.5 9.375v-4.5Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 6.75h.75v.75h-.75v-.75ZM6.75 16.5h.75v.75h-.75v-.75ZM16.5 6.75h.75v.75h-.75v-.75ZM13.5 13.5h.75v.75h-.75v-.75ZM13.5 19.5h.75v.75h-.75v-.75ZM19.5 13.5h.75v.75h-.75v-.75ZM19.5 19.5h.75v.75h-.75v-.75ZM16.5 16.5h.75v.75h-.75v-.75Z" />
                            </svg>
                            }/> */}
                  <NavLink
                    name="reports"
                    action="bdrrm/reports"
                    icon={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fill="currentColor"
                          d="M8.8 0c.274 0 .537.113.726.312l3.2 3.428c.176.186.274.433.274.689V13a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V1a1 1 0 0 1 1-1zM12 5H8.5a.5.5 0 0 1-.5-.5V1H2v12h10zm-7.5 6a.5.5 0 1 1 0-1h5a.5.5 0 1 1 0 1zm0-3a.5.5 0 0 1 0-1h5a.5.5 0 1 1 0 1zm1 8a.5.5 0 1 1 0-1H14V6.5a.5.5 0 1 1 1 0V15a1 1 0 0 1-1 1z"
                        />
                      </svg>
                    }
                  />
                </>
              )}
            </ul>
          </div>
        </div>
        <div className="relative group__sec-2 hidden md:flex md:space-x-2 lg:space-x-6 items-center">
          <div
            className={`contact ${
              user && user.role == "admin" ? "hidden" : "block"
            }`}
          >
            <a
              href="/contact-us"
              className="md:text-sm lg:text-lg py-3 px-8 bg-cblack text-white rounded-md border border-cblack hover:bg-clgreen hover:text-cblack ctransition"
            >
              Contact
            </a>
          </div>

          {user && (
            <div onClick={() => setIsProfileClicked(!isProfileClicked)}>
                <div className="user flex items-center space-x-4 cursor-pointer">
                    <div
                        className={`image-wrapper rounded-full overflow-hidden w-12 h-12 ${
                        !user ? "hidden" : "block"
                        } border border-cblack cursor-pointer`}
                    >
                        <img
                        src={
                            user &&
                            `${window.location.origin}/storage/uploads/` + user.image
                        }
                        alt="profile__picture"
                        className="w-full h-full object-cover"
                        />
                    </div>
                    {props.auth.user.role !== "beneficiary" && (
                        <div className="role uppercase text-gray-500 font-bold">{props.auth.user.role}</div>
                    )}
                </div>

              <AnimatePresence>
                {isProfileClicked && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ ease: "easeInOut" }}
                    className="absolute right-0 transform top-16 bg-cwhite rounded-lg shadow-lg w-[150px] border border-gray-300"
                  >
                    <ul className="rounded-lg overflow-hidden">
                      <li className="w-full hover:bg-cgray ctransition border-b border-gray-300 cursor-pointer">
                        <Link
                          href="/profile"
                          className="w-full px-2 py-4 flex items-center justify-between space-x-8"
                        >
                          <span>Profile</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="30"
                            height="30"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="currentColor"
                              d="M6.4 18L5 16.6L14.6 7H6V5h12v12h-2V8.4z"
                            />
                          </svg>
                        </Link>
                      </li>
                      <li
                        className="w-full hover:bg-cgray ctransition cursor-pointer"
                        onClick={(e) => {
                          e.preventDefault();
                          post("/logout");
                        }}
                      >
                        <div className="w-full px-2 py-4 flex items-center justify-between space-x-8">
                          <span>Logout</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="30"
                            height="30"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="currentColor"
                              d="M6.4 18L5 16.6L14.6 7H6V5h12v12h-2V8.4z"
                            />
                          </svg>
                        </div>
                      </li>
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
        <div className="burger__icon block md:hidden" onClick={handleOpenClick}>
          <p className="text-base uppercase hover:underline font-bold cursor-pointer">
            menu
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Nav;
