import React from 'react';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { toast } from 'react-toastify';
import { createOrder } from '../services/orderService';
import LoginInput from './LoginInput';
import { FaLock } from 'react-icons/fa';
import { IoPersonCircleSharp } from "react-icons/io5";
import { FaAddressCard } from "react-icons/fa";
import { motion } from "framer-motion";
import OrderItemsList from './OrderItemsList';
import Map from './Map/Map';


export default function CheckoutPage() {
  const { cart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [order, setOrder] = useState({ ...cart });
  const { clearCart } = useCart();

  const [name,setName]=useState(user.name)
  const [address,setAddress]=useState(user.address)

  const submit = async () => {
    if (!order.addressLatLng) {
      toast.warning('Please select your location on the map');
      return;
    }

     await createOrder({ ...order, name: name, address: address});
     clearCart();
     navigate('/payment');
    
  };

  return (
    <>
         <div className="w-full h-full  relative flex items-start justify-between bg-lightBackground gap-2 ">
       <div className="flex flex-col items-center h-full w-1/2  backdrop-blur-md p-4 px-4 py-40 gap-6">
       <p className="text-3xl font-semibold text-headingColor ">
         Order Form
        </p>
        <div className="w-full flex flex-col items-center justify-center gap-6 px-4 md:px-12 py-4">
        <LoginInput
              placeholder={"Name here"}
              icon={<IoPersonCircleSharp className="text-xl text-textColor" />}
              inputState={name}
              inputStateFunc={setName}
              type="text"
              
            />
             <LoginInput
              placeholder={"Address here"}
              icon={<FaAddressCard className="text-xl text-textColor" />}
              inputState={address}
              inputStateFunc={setAddress}
              type="text"
              
            />
        </div>
        {/* order items */}
        <OrderItemsList order={order} />
       </div>
       <div className="flex flex-col items-center w-1/2 h-full  backdrop-blur-md p-4 px-4 py-40 gap-6">
       <div>
       <p className="text-3xl font-semibold text-headingColor  ">
       Choose Your Location
        </p>
        {/* Map */}
        <Map
            location={order.addressLatLng}
            onChange={latlng => {
              console.log(latlng);
              setOrder({ ...order, addressLatLng: latlng });
            }}
          />
          <motion.button
                whileTap={{ scale: 0.8 }}
                type="button"
                className="w-full p-2 rounded-full bg-gradient-to-tr from-orange-400 to-orange-600 text-gray-50 text-lg my-2 hover:shadow-lg mt-20"
                onClick={submit }
              >
             Submit Payment
              </motion.button>
          </div> 
              
       </div>
       </div>  


      
              
      
        
       
       

        

     
    </>
 
  );
}
