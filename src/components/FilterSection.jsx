import React,{useState} from 'react'
import {motion} from "framer-motion"
import { sample_foods,categories} from "../utils/data";
import { IoFastFood } from "react-icons/io5";
import Card from './Card';

export default function FilterSection({foods,categories}) {

    const [category,setCategory]=useState("fruits")
  return (
    <motion.div className='w-full flex items-start justify-start flex-col'>
    <div className='w-full flex items-center justify-between'>
       <div className='flex flex-col items-start justify-start gap-1'>
       <p className='text-2xl text-headingColor font-bold'>Our Hot Dishes</p>
       <div className='w-40 h-1 rounded-md bg-orange-500'></div>
       </div>
    </div>

    <div className='w-full overflow-x-scroll pt-6 flex items-center justify-center gap-6 py-8'>
{categories && categories.map((data,index)=>(
    <FilterCard key={index} data={data} category={category} setCategory={setCategory} />
))

}
    </div>
    <div className='w-full flex items-ceneter justify-evenly flex-wrap gap-4 mt-12 '>
      {foods && foods.filter(data=>data.category===category).map((data,i)=><Card key={i} data={data}/>)} 
    
    </div>
   </motion.div>
  )
}


export const FilterCard=({data,index,category,setCategory})=>{
    return(
        <motion.div key={index} className={`group w-28 min-w-[128px] cursor-pointer rounded-md py-6 ${category===data.name ? "bg-red-500" :"bg-primary"}
        hover:bg-red-500 shadow-md flex flex-col items-center justify-center gap-4 py-6  `} 
      onClick={()=>setCategory(data.name)}
        >
                <div className={`w-10 h-10 rounded-full shadow-md flex items-center justify-center group-hover:bg-primary 
                ${category===data.name ? "bg-primary" :"bg-red-500"}
                `}>
                    <IoFastFood
                 className={`${
                      category === data.name
                        ? "text-textColor"
                        : "text-white"
                    } group-hover:text-textColor text-lg`}/>
                </div>
                <p className={`text-xl font-semibold ${category===data.name ? "text-primary" : "text-textColor"} group-hover:text-primary`}>{data.name}</p>
        </motion.div>
    )
}