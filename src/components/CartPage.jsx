import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import { useCart } from "../hooks/useCart";
import { useAuth } from "../hooks/useAuth";
import { motion } from "framer-motion";
import EmptyCart from "../assests/img/emptyCart.svg";
import { BiMinus, BiPlus } from "react-icons/bi";


const CartPage = () => {
   
    const { cart,removeFromCart,changeQuantity} = useCart();
    const { user } = useAuth();
    return (
        <>
        <motion.div
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 200 }}
      className="fixed  w-full  h-screen bg-white drop-shadow-md flex flex-col "
    >
            {cart.items.length  === 0 ? (
              <div className="w-full h-full flex flex-col items-center justify-center gap-6">
              <img src={EmptyCart} className="w-300" alt="" />
              <p className="text-xl text-textColor font-semibold">
                Add some items to your cart
              </p>
            </div>
            ) : (
                <div className="d-flex  w-100 h-100">
                <div className="col-xs-12 col-md-8 mt-4">
                    <ul class="list-group list-group-flush">
                            {cart.items &&
              cart.items.length > 0 &&
              cart.items.map((item,index) => (
                                <li key={index} id={index} class="list-group-item">
                                    <div className="card mb-3">
                                        <div className="row g-0 ">
                                        <div className="col-md-5 d-flex justify-content-center align-items-center">
                                                <img
                                                    src={item.food.imageURL}
                                                    className="img-fluid product-img"
                                                    alt={item.food.name}
                                                    style={{ borderRadius: "30px" }}
                                                />
                                            </div>
                                            <div className="col-md-7 ">
                                                <div className="row g-0">
                                                    <div className="col-md">
                                                        <div className="card-body">
                                                            <div className="row">
                                                                <div className="col">
                                                                    <h5 className="card-title">{item.food.name}</h5>
                                                                </div>
                                                                <div className="col">
                                                                    <h5 className="card-title d-flex justify-content-end ">
                                                                        ${item.food.price}
                                                                    </h5>
                                                                </div>
                                                            </div>
                                                            <div className="row mt-2">
                                                                <div className="col d-flex">
                                                                    <p className="card-text">
                                                                        <b>Category : </b>
                                                                        {item.food.category}
                                                                    </p>
                                                                </div>
                                                                <div className="col d-flex justify-content-end">
                                                                    <h5 className="card-text text-success ">
                                                                        ⭐ {item.food.stars}
                                                                    </h5>
                                                                </div>
                                                            </div>
                                                            <div className="row mt-2">
                                                                <div className="col d-flex">
                                                                    <p className="card-text">
                                                                        {item.food.decp}
                                                                    </p>
                                                                </div>
                                                                <div className="col d-flex justify-content-end align-items-center">
                                                                  
                                                                </div>
                                                            </div>

                                                            <div className="row mt-2">
                                                                <div className="col d-flex">
                                                                <small className="text-muted d-flex align-items-center">
                                                                        Last updated 10 mins ago
                                                                    </small>
                                                                </div>
                                                                <div className="col d-flex align-items-center justify-content-end">
                                                                    <div>
                                                                        <IconButton
                                                                            size="small"
                                                                            color="error"
                                                                            onClick={() => changeQuantity(item, item.quantity-1)}
                                                                        >
                                                                            -
                                                                        </IconButton>
                                                                        <b> {item.quantity}</b>
                                                                        <IconButton
                                                                            size="small"
                                                                            color="error"
                                                                            onClick={() => changeQuantity(item, item.quantity+1)}
                                                                        >
                                                                            +
                                                                        </IconButton>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col"></div>
                                                            </div>
                                                            
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row g-0 p-4 subtotal">
                                                    <div className="col ">
                                                        <div className="row">
                                                            <div className="card-title col">
                                                                Original Price (1 item) :
                                                            </div>
                                                            <div className="card-title col text-end">
                                                                {item.food.price}
                                                            </div>
                                                        </div>

                                                        <div className="row">
                                                            <div className="card-title col d-flex align-items-center">
                                                                Sub-Total Amount (Final price * Quantity) : {item.food.price}*{item.quantity}
                                                            </div>
                                                            <div className="card-title col text-end fs-4 fw-normal">
                                                            ₹ {parseFloat(item.food.price) * item.quantity}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
   
                            ))}
                       </ul>
                        </div>
                        <div className="col-xs-12 col-md-4  mt-4  justify-content-center align-item-center ">
                        <h4 className="title">Total items: {cart.totalCount} </h4>

                        <h4>Total: ₹{cart.totalPrice}
 </h4>
                        <Button
                            variant="contained"
                            color="error"
                            disabled={cart.length === 0}
                            
                        >
                            Proceed to Checkout
                        </Button>
                        
                    </div>
                    
                    </div>
                  
               
            )}
            </motion.div>
        </>
    );
};

export default CartPage;