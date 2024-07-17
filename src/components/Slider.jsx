import React, { useEffect, useState } from 'react'
import {Swiper,SwiperSlide} from "swiper/react"
import 'swiper/css';
import "swiper/css/bundle"
import "../assests/css/swiperStyles.css"

import Card from './Card';

const Slider = ({foods}) => {
  
  return (
    <div className='w-full pt-24'>
    <Swiper
        slidesPerView={4}
        centeredSlides={false}
        spaceBetween={30}
        grabCursor={true}
       
      
        className="mySwiper"
      >
        {foods.filter(data=>data.category==="fruits").map((data,i)=>(
 <SwiperSlide key={i}>
    <Card key={i} data={data} index={i}/>
 </SwiperSlide>
        ))}
       
        
      </Swiper>
        </div>
  )
}

export default Slider