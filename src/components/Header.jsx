import React from "react";
import Logo from "../assests/img/logo.png";
import { Link } from "react-router-dom";
import Avatar from "../assests/img/avatar.png";
import { MdShoppingBasket, MdAdd, MdLogout } from "react-icons/md";
import { motion } from "framer-motion";
import { isActiveStyles, isNotActiveStyles } from "../utils/styles";
import { NavLink } from "react-router-dom";
import { buttonClick, slideTop } from "../animations";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';


const Header = () => {
  const { cart,showCart } = useCart();
  const { user, logout } = useAuth();
  const [isMenu, setIsMenu] = useState(false);
  const [iscartOpen, setIscartOpen] = useState(false);

  const navigate = useNavigate();

  // const signOut = () => {
  //   navigate("/login", { replace: true });
  // };

  return (
    <header className="fixed  backdrop-blur-md inset-x-0 flex items-center justify-between px-12 md:px-20 py-6 z-50">
      {/* desktop & tablet */}
      <div className=" md:flex w-full h-full items-center justify-between">
        <Link to={"/"} className="flex items-center justify-center gap-2 ">
          <img src={Logo} className="w-14 object-cover" alt="logo" />
          <p className="text-headingColor text-xl font-bold"> PixelPalate</p>
        </Link>
        <div className="flex items-center gap-8">
          <ul
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            className="flex items-center gap-8 "
          >
            <NavLink
              className={({ isActive }) =>
                isActive ? isActiveStyles : isNotActiveStyles
              }
              to={"/"}
            >
              Home
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? isActiveStyles : isNotActiveStyles
              }
              to={"/menu"}
            >
              Menu
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? isActiveStyles : isNotActiveStyles
              }
              to={"/services"}
            >
              Services
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? isActiveStyles : isNotActiveStyles
              }
              to={"/aboutus"}
            >
              About Us
            </NavLink>
          </ul>

          <motion.div
            {...buttonClick}
            className="relative flex items-center justify-center"
           onClick={()=>navigate("/cart")}
          >
            <MdShoppingBasket className="text-textColor text-2xl  cursor-pointer" />
            {cart.totalCount > 0 && (
            <div className=" absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
           
              <p className="text-xs text-white font-semibold">{cart.totalCount}</p>
              </div>
              )}
            
          </motion.div>
          {user ? (
            <>
              <div
                className="relative cursor-pointer"
                onMouseEnter={() => setIsMenu(true)}
              >
                <div className="w-12 h-12 rounded-full shadwo-md cursor-pointer overflow-hidden flex items-center justify-center">
                  <motion.img
                    whileTap={{ scale: 0.6 }}
                    src={user?.picture ? user?.picture : Avatar}
                    className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full"
                    alt="userprofile"
                    referrerPolicy="no-referrer"
                  />
                </div>
                {isMenu && (
                  <motion.div
                    {...slideTop}
                    onMouseLeave={() => setIsMenu(false)}
                    className="px-6 py-4 w-48 bg-lightOverlay backdrop-blur-md rounded-md shadow-md absolute top-12 right-0 flex flex-col gap-2"
                  >


                    {user.isAdmin &&(
                     
                    <NavLink
                      className="hover:text-red-500 text-xl text-textColor"
                      to={"/dashboard"}
                    >
                       Dashboard
                    </NavLink>
                   )}

                    <NavLink
                      className="hover:text-red-500 text-xl text-textColor"
                      to={"/profile"}
                    >
                      My Profile
                    </NavLink>
                    <NavLink
                      className="hover:text-red-500 text-xl text-textColor"
                      to="/orders"
                    >
                      Orders
                    </NavLink>
                    <hr />
                    <motion.div
                      {...buttonClick}
                      onClick={logout}
                      className="group flex items-center justify-center shadow-md hover:bg-grap-200 px-3 gap-3 py-2 rounded-md bg-gray-200"
                    >
                      <MdLogout className="text-xl text-textColor group-hover::text-headingColor" />
                      <p className="text-textColor  group-hover::text-headingColor">
                        Sign Out
                      </p>
                    </motion.div>
                  </motion.div>
                )}
              </div>
            </>
          ) : (
            <>
              <NavLink to={"/login"}>
                <motion.button
                  {...buttonClick}
                  className="px-4 py-2 rounded-md shadow-md bg-lightOverlay border border-red-300 cursor-pointer text-textColor"
                >
                  Login
                </motion.button>
              </NavLink>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
