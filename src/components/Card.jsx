import React from 'react'
import { HiCurrencyRupee } from "react-icons/hi";
import { buttonClick } from '../animations';
import { IoBasket } from "react-icons/io5";
import {motion} from "framer-motion"
import { useCart } from '../hooks/useCart';
import { CiDollar } from "react-icons/ci";

const Card = ({data,index}) => {
  const { addToCart } = useCart();
  return (
    <div className='bg-lightOverlay hover:frop-shadow-lg backdrop-blur-md rounded-xl flex items-center justify-between relative px-4 py-2 w-full md:w-340 md:min-w-350 gap-3'>
        <img
                  src={data.imageUrl}
                  alt=""
                  className="w-40 h-40 object-contain"
                />
                <div className='relative pt-12'>
                    <p className='text-xl text-headingColor font-semibold'>
                        {data.name}
                    </p>
                    <p className='text-lg font-semibold text-red-500 flex items-center justify-center gap-1'>
                     <CiDollar className='text-red-500'/>{" "}
                     {parseFloat(data.price).toFixed(2)}
                    </p>
                    <motion.div {...buttonClick} className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center absolute -top-4 right-2 cursor-pointer"
                    onClick={()=>addToCart(data)}>
                    <IoBasket className="text-2xl text-primary"/>
                    </motion.div>
                </div>
        </div>
  )
}

export default Card