import React, { useEffect, useReducer } from "react";
import { Link, useParams } from "react-router-dom";

import { getAll, getAllStatus } from "../services/orderService";

const initialState = {};
const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "ALL_STATUS_FETCHED":
      return { ...state, allStatus: payload };
    case "ORDERS_FETCHED":
      return { ...state, orders: payload };
    default:
      return state;
  }
};

export default function OrdersPage() {
  const [{ allStatus, orders }, dispatch] = useReducer(reducer, initialState);

  const { filter } = useParams();

  useEffect(() => {
    getAllStatus().then((status) => {
      dispatch({ type: "ALL_STATUS_FETCHED", payload: status });
    });
    getAll(filter).then((orders) => {
      dispatch({ type: "ORDERS_FETCHED", payload: orders });
    });
  }, [filter]);

  return (

    <div className='w-full h-auto flex flex-col items-center justify-center mt-40 px-6 md:px-24 gap-12 '>
    <div className="flex justify-center items-center flex-col">
      <p className="text-3xl font-semibold text-headingColor ">Orders</p>

      {allStatus && (
        <div class="flex flex-col gap-4 w-max">
          <div class="flex divide-x row">
            <Link
              to="/orders"
              className=" mt-20 align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-l bg-red-400  text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] 
          focus:shadow-none active:opacity-[0.85] active:shadow-none rounded-r-none border-r-0"
            >
              All
            </Link>

            {allStatus.map((state) => (
              <Link
                key={state}
                className="mt-20 align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-l bg-red-400  text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] 
                focus:shadow-none active:opacity-[0.85] active:shadow-none rounded-r-none border-r-0"
                to={`/orders/${state}`}
              >
                {state}
              </Link>
            ))}
          </div>
        </div>
      )}

     
       

      <div class="mt-20 flex flex-col xl:flex-row jusitfy-evenly items-center w-[60%] xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0 ">
        <div class="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
          {orders &&
            orders.map((order) => (
              <div
                key={order.id}
                className="flex flex-col justify-start items-start dark:bg-gray-800 bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full"
              >
                <h1 class="text-xl dark:text-white lg:text-2xl font-semibold leading-7 lg:leading-9 text-gray-800">
                  order id #{order.id}
                </h1>
                <p class="text-base dark:text-gray-300 font-medium leading-6 text-gray-600">
                  {order.createdAt}{" "}
                </p>

                <div class="mt-4 md:mt-6 flex flex-col md:flex-row  items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
                  <div class="pb-4 md:pb-8 w-full md:w-[30%] flex  ">
                    {order.items.map((item) => (
                      <Link key={item.food.id} to={`/food/${item.food.id}`}>
                        <img
                          src={item.food.imageUrl}
                          alt={item.food.name}
                          className="w-full hidden md:block"
                        />
                      </Link>
                    ))}
                  </div>
                 

                  <div class="flex justify-around space-x-8 items-start w-full">
                    <p class="text-base dark:text-white xl:text-lg leading-6 text-red-300">
                      {order.status}{" "}
                    </p>

                    <p class="text-base dark:text-white xl:text-lg font-semibold leading-6 text-gray-800">
                      {order.totalPrice}
                    </p>
                  </div>
                </div>
                <h1 class="text-xl dark:text-white lg:text-2xl font-semibold leading-7 lg:leading-9 text-gray-800 right-0">
                <Link to={`/track/${order.id}`}>Show Order</Link>
                </h1>
                
              </div>
            ))}
        </div>
      </div>
      </div>
    </div>
  );
}
