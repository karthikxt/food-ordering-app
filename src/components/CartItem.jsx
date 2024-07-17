import React, { useEffect, useState } from "react";
import { BiMinus, BiPlus } from "react-icons/bi";
import { motion } from "framer-motion";
import { useCart } from "../hooks/useCart";


const CartItem = ({ item,id }) => {
  

    const {   changeQuantity,removeFromCart } = useCart();

 
  

  return (
    <div className="w-full  p-1 px-2 rounded-lg bg-cartItem flex items-center gap-2">
      <img
        src={item.food.imageUrl}
        className="w-50 h-50 max-w-[60px] rounded-full object-contain"
        alt=""
      />

      {/* name section */}
      <div className="flex flex-col gap-2">
        <p className="text-base text-gray-50">{item.food.name}</p>
        <p className="text-sm block text-gray-300 font-semibold">
          $ {parseFloat(item.food.price) * item.quantity}
        </p>
      </div>

     

      {/* button section */}
      <div className="group flex items-center gap-2 ml-auto cursor-pointer">
        <motion.div
          whileTap={{ scale: 0.75 }}
          onClick={() => changeQuantity(item, item.quantity-1)}
        >
          <BiMinus className="text-gray-50 " />
        </motion.div>

        <p className="w-5 h-5 rounded-sm bg-cartBg text-gray-50 flex items-center justify-center">
          {item.quantity}
        </p>

        <motion.div
          whileTap={{ scale: 0.75 }}
          onClick={() => changeQuantity(item, item.quantity+1)}
        >
          <BiPlus className="text-gray-50 " />
        </motion.div>
      </div>

      <div className="flex flex-col gap-2">
      <button
          type="button"
          className="ml-20 bg-gradient-to-br from-orange-400 to-orange-500 w-full md:w-auto px-4 py-2  rounded-lg hover:shadow-lg transition-all ease-in-out duration-100"
           onClick={()=>removeFromCart(item.food.id)}
        >
         Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;