import React, { useEffect } from 'react'
import { CgProfile } from "react-icons/cg";
import { MdEmail } from "react-icons/md";
import { FaAddressCard } from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";
import { getById, updateUser } from '../services/userService';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import AdminHeader from './AdminHeader';

export default function UserEdit() {
    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
      } = useForm();
    
      const { userId } = useParams();
      const isEditMode = userId;
      useEffect(() => {
        if (isEditMode) loadUser();
      }, [userId]);
    
      const loadUser = async () => {
        const user = await getById(userId);
        reset(user);
      };
    
      const submit = userData => {
        updateUser(userData);
      };
  return (
    <div className="w-full h-full flex flex-col justify-center items-center ">
      <div className="w-[30%]">
        <AdminHeader />
      </div>
      <div className="w-[90%] justify-center items-center flex flex-col ml-60 mt-40 gap-10">
      <p className="text-3xl font-semibold text-headingColor ">
      {isEditMode ? 'Edit User' : 'Add User'}
        </p>
         
          <form
          className="w-[90%] md:w-[50%] border border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center gap-4"
          onSubmit={handleSubmit(submit)}
          noValidate
        >
            <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
              <CgProfile className="text-xl text-gray-700" />
              <input
                type="text"
               
                {...register('name', { required: true, minLength: 5 })}
                placeholder="Give me a Name..."
                className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
              />
            </div>
        <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
              <MdEmail className="text-gray-700 text-2xl" />
              <input
                type="email"
               
                {...register('email', { required: true })}
                placeholder="Email here"
                className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
              />
            </div>

            <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
              <FaAddressCard className="text-gray-700 text-2xl" />
              <input
                type="text"
                
                {...register('address', { required: true })}
                placeholder="Address here"
                className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
              />
            </div>
            <div className="w-full py-2 border-b border-gray-300 flex gap-2">
              <RiAdminFill  className="text-gray-700 text-2xl" />
              <input
                type="checkbox"
                
                {...register('isAdmin')}
                placeholder="Address here"
                className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
              />
            </div>

            <div className="flex justify-center items-center ">
            <button
              type="submit"
              className="ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-emerald-500 px-12 py-2 rounded-lg text-lg text-white font-semibold"
           
            >
              {isEditMode ? 'Update' : 'Create'}
            </button>
          </div>
          
          </form>
          
        </div>
      
      
      </div>
   
  )
}
