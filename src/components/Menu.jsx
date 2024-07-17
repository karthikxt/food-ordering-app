import React, { useEffect, useReducer, useState } from "react";
import {
  getAll,
  getAllCategories,
  getAllByCategory,
  search,
} from "../services/foodService";
import { useCart } from "../hooks/useCart";
import { useNavigate, useParams, Link } from "react-router-dom";
import Search from "./Search";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";

const initialState = { foods: [], categories: [] };

const reducer = (state, action) => {
  switch (action.type) {
    case "FOODS_LOADED":
      return { ...state, foods: action.payload };
    case "CATEGORIES_LOADED":
      return { ...state, categories: action.payload };
    default:
      return state;
  }
};
export default function Menu() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { foods, categories } = state;
  const { searchTerm, category } = useParams();
  const { addToCart,removeFromCart,cart } = useCart();

  useEffect(() => {
    getAllCategories().then((categories) =>
      dispatch({ type: "CATEGORIES_LOADED", payload: categories })
    );

    const loadFoods = category
      ? getAllByCategory(category)
      : searchTerm
      ? search(searchTerm)
      : getAll();

    loadFoods.then((foods) =>
      dispatch({ type: "FOODS_LOADED", payload: foods })
    );
  }, [searchTerm, category]);
  return (
    <>
      <div className="w-full h-auto flex flex-col items-center justify-center mt-40 px-6 md:px-24 gap-12 bg-lightBackground">
        <Search />
 
      
        {categories && (
      
      <div class="flex flex-col gap-6 w-max">
      <div class="flex divide-x row">
              <Link
                to="/menu"
                className=" mt-10 align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-l bg-red-400  text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] 
          focus:shadow-none active:opacity-[0.85] active:shadow-none rounded-r-none border-r-0"
              >
                All
              </Link>
              {categories.map((category) => (
              <Link
                key={category.name}
                className="mt-10 align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-l bg-red-400  text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] 
                focus:shadow-none active:opacity-[0.85] active:shadow-none rounded-r-none border-r-0 "
                to={`/category/${category.name}`}
              >
                {category.name} ({category.count})
              </Link>
             ))}
             </div>
           </div>
         )}

<div className='w-full flex items-ceneter justify-evenly flex-wrap gap-4 mt-12 '>
{ foods.map((data)=>(
<div class="mx-auto mt-11 w-80 transform overflow-hidden rounded-lg bg-white dark:bg-slate-800 shadow-md duration-300 hover:scale-105 hover:shadow-lg">
  <img class="h-48 w-full object-contain object-center" src={data.imageUrl} alt={data.name} />
  <div class="p-4">
  <div class="flex items-center justify-between">
    <h2 class="mb-2 text-lg font-medium dark:text-white text-gray-900">{data.name}</h2>
    <p class="ml-auto text-xl ">{data.favorite ? <MdFavorite className='text-red-500'/> : <MdFavoriteBorder />}</p>
    </div>
    <div class="flex items-center justify-between">
      <p class="mr-2 text-lg font-semibold text-gray-900 dark:text-white">$20.00</p>
      <p class="mb-2 text-xl dark:text-gray-300">⭐{data.stars}</p>
     
    </div>
    <div class="flex items-center justify-center">
   
         
                <button type="button" class="text-white bg-gradient-to-r from-red-200 via-red-400 to-red-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:red-300 dark:focus:bg-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                  
                  onClick={() => addToCart(data)}>
                  Add To Cart
                </button>
            
    
        
         
        </div>
  </div>
</div>
))
}
</div>
      </div>
    </>
  );
}
