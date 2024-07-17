import React from "react";
import LoginBg from "../assests/img/delivery.png";
import logo from "../assests/img/logo1.png";
import LoginInput from "./LoginInput";
import { useState,useEffect } from "react";
import { FaEnvelope } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";
import { buttonClick } from "../animations";
// import { getAuth, signInWithPopup, GoogleAuthProvider,createUserWithEmailAndPassword ,signInWithEmailAndPassword} from "firebase/auth";
// import { app } from "../config/firebase.config";
// import { validateUserJWTToken } from "../api";
import {Link, useNavigate,useSearchParams} from "react-router-dom"
import { toast } from 'react-toastify';
import { useAuth } from "../hooks/useAuth";
import { getAll } from "../services/foodService";


export default function Login() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSignUp, setisSignUp] = useState(false);
  const [password, setpassword] = useState("");
  const [confirm_password, setconfirm_password] = useState("");
  const [address, setAddress] = useState("");

  // const firebaseAuth = getAuth(app);
  // const provider = new GoogleAuthProvider();
  const navigate=useNavigate()

  const { user, login,register } = useAuth();
  const [params] = useSearchParams();
  const returnUrl = params.get('returnUrl');

 

  const handleSignin = async () => {
    console.log(email,password)
     await login(email, password);
     navigate("/",{replace:true})
    
  };

  const handleRegister=async()=>{
    if((email=== ""|| password==="" || confirm_password==="" || name==="" || address==="")){
      toast.error("Required fields should not be empty")
    }else{
      if(password===confirm_password){
         
        const newUser={
          name,
          email,
          password,
          address
        }
        
        await register(newUser)
        setName("")
                  setAddress("")
                  setEmail("")
                  setconfirm_password("")
                  setpassword("")
                  navigate("/",{replace:true})
         
    
      }else{
        toast.error("Password doesnt match")
      }
    }
  }

  // const loginwithGoogle = async () => {
  //   await signInWithPopup(firebaseAuth, provider).then((userCred) => {
  //     firebaseAuth.onAuthStateChanged((cred) => {
  //       if (cred) {
  //         cred.getIdToken().then((token) => {
  //           console.log(token);
  //           validateUserJWTToken(token).then(data=>{console.log(data)

  //            } )
  //            navigate("/",{replace:true})
  //         });
  //       }
  //     });
  //   });
  // };

 
  return (
    <div className="w-screen h-screen  relative flex items-center justify-center">
     

      <div className="flex flex-col items-center bg-lightOverlay w-[80%] md:w-508  z-10 backdrop-blur-md p-4 px-4 py-12 gap-6">
        <div className="flex items-center justify-start gap-4 w-full">
          <Link to="/">
          <img src={logo} className="w-13" /></Link>
          {/* <p className="text-headingColor font-semibold text-2xl">Pixelpalate</p> */}
        </div>

        <p className="text-3xl font-semibold text-headingColor ">
          Welcome Back
        </p>
        <p className="text-xl text-textColor -mt-6">
          {isSignUp ? "Sign-Up" : "Sign-in"} with following
        </p>

        {/* Input section */}
        <div className="w-full flex flex-col items-center justify-center gap-6 px-4 md:px-12 py-4">
        {isSignUp && (
            <LoginInput
              placeholder={"Name here"}
              icon={<FaLock className="text-xl text-textColor" />}
              inputState={name}
              inputStateFunc={setName}
              type="text"
              
            />
          )}
          <LoginInput
            placeholder={"Email here"}
            icon={<FaEnvelope className="text-xl text-textColor" />}
            inputState={email}
            inputStateFunc={setEmail}
            type="email"
          
          />
          <LoginInput
            placeholder={"Password here"}
            icon={<FaLock className="text-xl text-textColor" />}
            inputState={password}
            inputStateFunc={setpassword}
            type="password"
           
          />
          {isSignUp && (
            <LoginInput
              placeholder={"confirm password here"}
              icon={<FaLock className="text-xl text-textColor" />}
              inputState={confirm_password}
              inputStateFunc={setconfirm_password}
              type="password"
              
            />
          )}
             {isSignUp && (
            <LoginInput
              placeholder={"Address here"}
              icon={<FaLock className="text-xl text-textColor" />}
              inputState={address}
              inputStateFunc={setAddress}
              type="text"
             
            />
          )}
          {!isSignUp ? (
            <p>
              Doesn't have an account:{" "}
              <motion.button
                {...buttonClick}
                className="text-red-400 underline cursor-pointer bg-transparent"
                onClick={() => setisSignUp(true)}
              >
                {" "}
                Create one
              </motion.button>
            </p>
          ) : (
            <p>
              Already have an account:{" "}
              <motion.button
                {...buttonClick}
                className="text-red-400 underline cursor-pointer bg-transparent"
                onClick={() => setisSignUp(false)}
              >
                {" "}
                Sign-in here
              </motion.button>
            </p>
          )}

          {/* button section */}
          {isSignUp ? (
            <motion.button
              {...buttonClick}
              className="w-full px-4 py-2 rounded-md bg-red-400 cursor-pointer text-white text-xl capitalize hover:bg-red-500 transition-all duration-150"
              // onClick={signUpwithEmailPass}
              onClick={handleRegister}
            >
              Sign Up
            </motion.button>
          ) : (
            <motion.button
              {...buttonClick}
              className="w-full px-4 py-2 rounded-md bg-red-400 cursor-pointer text-white text-xl capitalize hover:bg-red-500 transition-all duration-150"
              // onClick={signInWithEmailPass}
              onClick={handleSignin}
            >
              Sign in
            </motion.button>
          )}
        </div>
        {/* <div className="flex items-center justify-between gap-16">
          <div className="w-12 h-[1px] rounded-md bg-white"></div>
          <p className="text-white">or</p>
          <div className="w-12 h-[1px] rounded-md bg-white"> </div>
        </div> */}

        {/* <motion.div
          {...buttonClick}
          className="flex items-center justify-center px-20 py-2 bg-lightOverlay background-blur-md cursor-pointer rounded-3xl gap-4"
          // onClick={loginwithGoogle}
        >
          <FcGoogle className="text-3xl" />
          <p className="capitalize text-base text-textColor">
            Signin with Google
          </p>
        </motion.div> */}
      </div>
    </div>
  );
}
