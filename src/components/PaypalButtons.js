import {
    PayPalButtons,
    PayPalScriptProvider,
    usePayPalScriptReducer,
  } from '@paypal/react-paypal-js';
  import React, { useEffect } from 'react';
 import { toast } from 'react-toastify';
 import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useLoading } from '../hooks/useLoading';
import { pay } from '../services/orderService';
  
  export default function PaypalButtons({ order }) {
    return (
      <PayPalScriptProvider
        options={{
          clientId:
            'AQPAINhzlzuoNTdeb2jOo3f_XfzCI1D-k69X6vPOwSLuolXjg1VHdBD6BMO6tw-B9rsSQJkyDrIRAxGa',
        }}
      >
        <Buttons order={order} />
      </PayPalScriptProvider>
    );
  }
  
  function Buttons({ order }) {
    const { clearCart } = useCart();
    const navigate = useNavigate();
    const [{ isPending }] = usePayPalScriptReducer();
    const { showLoading, hideLoading } = useLoading();
    useEffect(() => {
      isPending ? showLoading() : hideLoading();
    },[]);
  
    const createOrder = (data, actions) => {
      return actions.order.create({
        purchase_units: [
          {
            amount: {
              currency_code: 'USD',
              value: order.totalPrice,
            },
          },
        ],
      });
    };
  
    const onApprove = async (data, actions) => {
      try {
        const payment = await actions.order.capture();
        const orderId = await pay(payment.id);
        clearCart();
        toast.success('Payment Saved Successfully', 'Success');
        navigate('/track/' + orderId);
      } catch (error) {
        toast.error('Payment Save Failed', 'Error');
      }
    };
  
    const onError = err => {
      toast.error('Payment Failed', 'Error');
    };
  
    return (
      <PayPalButtons
        createOrder={createOrder}
        onApprove={onApprove}
        onError={onError}
      />
    );
  }