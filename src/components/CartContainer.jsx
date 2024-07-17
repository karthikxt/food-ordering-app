import React, { useEffect, useState } from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { RiRefreshFill } from "react-icons/ri";

import { motion } from "framer-motion";

import EmptyCart from "../assests/img/emptyCart.svg";
import { useCart } from "../hooks/useCart";
import { useAuth } from "../hooks/useAuth";
import CartItem from "./CartItem";
import Header from "./Header";
import { useNavigate } from "react-router-dom";






const CartContainer = () => {

const { cart,clearCart} = useCart();
const { user } = useAuth();
const navigate=useNavigate()

return (
  <>

    <motion.div
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 200 }}
      className=" w-full h-auto flex flex-col items-center justify-center mt-40 px-6 md:px-24 "
    >
     
   

      {cart.items && cart.items.length > 0 ? (
              
        // <div className="py-2 flex-1 flex  items-center justify-between gap-6 md:h-650">
        <div className= "grid grid-cols-1 md:grid-cols-3 gap-2  mt-30 h-500 mx-150">
          {/* cart Items section */}
          <div className="py-2 col-span-2 flex-1 flex flex-col items-center justify-center gap-6 md:h-650">
          <div className="w-full h-full  px-6 py-10 flex flex-col gap-3  scrollbar-none">
            {/* cart Item */}
            {cart.items &&
              cart.items.length > 0 &&
              cart.items.map((item,index) => (
                <CartItem
                  key={index}
                  item={item}
                  
                  
                />
              ))}
          </div>
          </div>
          {/* cart total section */}
          <div className="py-2 flex-1 flex  justify-end relative mt-30  ">
          <div className="w-full md:w-375 flex-1 rounded flex flex-col items-center justify-evenly px-8 py-2 mt-30">
            <div className="w-full flex items-center justify-between">
              <p className="text-gray-400 text-lg">Sub Total</p>
              <p className="text-gray-400 text-lg">$ {cart.totalPrice}</p>
            </div>
            <div className="w-full flex items-center justify-between">
              <p className="text-gray-400 text-lg">Delivery</p>
              <p className="text-gray-400 text-lg">$ 2.5</p>
            </div>

            <div className="w-full border-b border-gray-600 my-2"></div>

            <div className="w-full flex items-center justify-between">
              <p className="text-red-500 text-xl font-semibold">Total</p>
              <p className="text-red-600 text-xl font-semibold">
                ${cart.totalPrice + 2.5}
              </p>
            </div>

            {user ? (
              <motion.button
                whileTap={{ scale: 0.8 }}
                type="button"
                className="w-full p-2 rounded-full bg-gradient-to-tr from-orange-400 to-orange-600 text-gray-50 text-lg my-2 hover:shadow-lg"
                onClick={()=>navigate("/checkout")}
              >
                Check Out
              </motion.button>
            ) : (
              <motion.button
                whileTap={{ scale: 0.8 }}
                type="button"
                className="w-full p-2 rounded-full bg-gradient-to-tr from-orange-400 to-orange-600 text-gray-50 text-lg my-2 hover:shadow-lg"
                onClick={()=>navigate("/checkout")}
              >
                Login to check out
              </motion.button>
            )}
          </div>
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center gap-6">
          <img src={EmptyCart} className="w-300" alt="" />
          <p className="text-xl text-textColor font-semibold">
            Add some items to your cart
          </p>
        </div>
        
      )
      
      }
      
 
  
 </motion.div>

 </>

                           

)
  
};

export default CartContainer;