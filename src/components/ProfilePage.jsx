import React from 'react'

import LoginInput from "./LoginInput";
import { useState,useEffect } from "react";
import { FaLock } from "react-icons/fa";

import { motion } from "framer-motion";
import { buttonClick } from "../animations";
import {Link, useNavigate,useSearchParams} from "react-router-dom"
import { toast } from 'react-toastify';
import { useAuth } from "../hooks/useAuth";
import Header from './Header';
import { IoPerson } from "react-icons/io5";
import { FaAddressCard } from "react-icons/fa6";


export default function ProfilePage() {
    const {user,updateProfile,changePassword}=useAuth();
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const[newPassword,setnewPassword]=useState("")
    const [password, setpassword] = useState(user.password);
    const [currentPassword, setcurrentPassword] = useState("");
    const [confirm_password, setconfirm_password] = useState("");
    const [address, setAddress] = useState(user.address);

    const submit=user=>{
         const editUser={
            name,
            email,
            address,
            password

         }
        updateProfile(editUser)
    }

    const resetPassword=()=>{
        if(( password != currentPassword)){
            toast.error("Enter currect old Password")
          }
else{
          if(newPassword === confirm_password){
           const passwords={
            currentPassword,
            newPassword,
           }
           changePassword(passwords)
          }else{
            toast.error("Passwords Do Not Match")
          }
        }
    }
  return (
    <>
     <div className="w-full h-full bg-lightBackground ">


    <div className='absolute left-[34%] top-[10%]'> 

      <div className="flex flex-col items-center justify center bg-lightOverlay w-[80%] md:w-508  z-10 backdrop-blur-md p-4 px-4 py-12 gap-6">
      

        <p className="text-3xl font-semibold text-headingColor ">
          Change Details
        </p>
        

        {/* Input section */}
        <div className="w-full flex flex-col items-center justify-center gap-10 px-4 md:px-12 py-4">
        
            <LoginInput
              placeholder={"Name here"}
              icon={<IoPerson className="text-xl text-textColor" />}
              inputState=""
              inputStateFunc={setName}
              type="text"
              />

            <LoginInput
              placeholder={"Address here"}
              icon={<FaAddressCard className="text-xl text-textColor" />}
              inputState=""
              inputStateFunc={setAddress}
              type="text"
             />
       
       <motion.button
              {...buttonClick}
              className="w-full px-4 py-2 rounded-md bg-red-400 cursor-pointer text-white text-xl capitalize hover:bg-red-500 transition-all duration-150"
             
              onClick={submit}
            >
              Update
            </motion.button>
            <p className="text-3xl font-semibold text-headingColor ">
          Change Password
        </p>
          <LoginInput
            placeholder={"Current Password"}
            icon={<FaLock className="text-xl text-textColor" />}
            inputState={currentPassword}
            inputStateFunc={setcurrentPassword}
            type="password"
           
          />
           <LoginInput
            placeholder={"New Password"}
            icon={<FaLock className="text-xl text-textColor" />}
            inputState={newPassword}
            inputStateFunc={setnewPassword}
            type="password"
           
          />
         
            <LoginInput
              placeholder={"confirm password "}
              icon={<FaLock className="text-xl text-textColor" />}
              inputState={confirm_password}
              inputStateFunc={setconfirm_password}
              type="password"
              
            />
         <motion.button
              {...buttonClick}
              className="w-full px-4 py-2 rounded-md bg-red-400 cursor-pointer text-white text-xl capitalize hover:bg-red-500 transition-all duration-150"
              // onClick={signUpwithEmailPass}
              onClick={resetPassword}
            >
              Reset Password
            </motion.button>

            </div>
          
      </div>
    </div>
  </div>
    </>
  )
}
