import React, { useEffect, useReducer } from 'react';
import Header from './Header'
import Home from './Home'
import HomeSlider from './HomeSlider'
import FilterSection from './FilterSection'
import { getAll, getAllCategories } from '../services/foodService';
import { useCart } from '../hooks/useCart';
import CartContainer from './CartContainer';


const initialState={foods:[],categories: []};
const reducer = (state, action) => {
  switch (action.type) {
    case 'FOODS_LOADED':
      return { ...state, foods: action.payload };
    case 'CATEGORIES_LOADED':
      return { ...state, categories: action.payload };
    default:
      return state;
  }
};

const MainContainer = () => {
  const { cart } = useCart();
  ;
  const [state, dispatch] = useReducer(reducer, initialState);
    const { foods,categories } = state;
    
    useEffect(()=>{
      getAllCategories().then(categories => dispatch({ type: 'CATEGORIES_LOADED', payload: categories }));
      
      const loadedFoods =  getAll();
      loadedFoods.then(foods=>dispatch({type:'FOODS_LOADED',payload:foods}))
    },[])
  return (
    <main className='w-screen min-h-screen flex flex-col items-center justify-start bg-lightBackground'>
      <Header/>
      <div className='w-full h-auto flex flex-col items-center justify-center mt-40 px-6 md:px-24 gap-12 '>
      <Home/>
      <HomeSlider foods={foods} />
      <FilterSection foods={foods} categories={categories}/>
      
      </div>
    
    </main>
  )
}

export default MainContainer
