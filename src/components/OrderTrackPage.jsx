import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { trackOrderById } from '../services/orderService';
import NotFound from './NotFound';
import DateTime from './DateTime';
import OrderItemsList from './OrderItemsList';
import Map from './Map/Map';
import { useNavigate } from 'react-router-dom';

import { motion } from "framer-motion";


export default function OrderTrackPage() {
  const { orderId } = useParams();
  const [order, setOrder] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    orderId &&
      trackOrderById(orderId).then(order => {
        setOrder(order);
      });
  }, []);

  if (!orderId)
    return <NotFound message="Order Not Found" linkText="Go To Home Page" />;

  return (
    order && (
        <div className="w-full h-full  relative flex items-start justify-between bg-lightBackground gap-2 ">
        <div className="flex flex-col items-center h-full w-1/2  backdrop-blur-md p-4 px-4 py-40 gap-6">
          <p className="text-3xl font-semibold text-headingColor" >Order #{order.id}</p>
          <div className="mb-4 ">
            <div className='flex justify-between gap-20'>
              <strong>Date</strong>
              <DateTime date={order.createdAt} />
            </div>
            <div className='flex justify-between gap-20'>
              <strong className='inline-block w-[20%] '>Name</strong>
              {order.name}
            </div>
            <div className='flex justify-between gap-20'>
              <strong className='inline-block w-[20%]'>Address</strong>
              {order.address}
            </div>
            <div className='flex justify-between gap-20'>
              <strong className='inline-block w-[20%]'>State</strong>
              {order.status}
            </div>
            {order.paymentId && (
              <div className='flex justify-between gap-20'>
                <strong className='inline-block w-[20%]'>Payment ID</strong>
                {order.paymentId}
              </div>
            )}
          </div>

          <OrderItemsList order={order} />
        </div>

        <div className="flex flex-col items-center w-1/2 h-full  backdrop-blur-md p-4 px-4 py-40 gap-6">
        <p className="text-3xl font-semibold text-headingColor  ">
       Your Location
        </p>
          <Map location={order.addressLatLng} readonly={true} />
        </div>

        {order.status === 'NEW' && (
            <motion.button
            whileTap={{ scale: 0.8 }}
            type="button"
            className="w-full p-2 rounded-full bg-gradient-to-tr from-orange-400 to-orange-600 text-gray-50 text-lg my-2 hover:shadow-lg mt-20"
            onClick={navigate("/payment")}
          >
         Go To Payment
          </motion.button>
          
        )}
      </div>
    )
  );
}
