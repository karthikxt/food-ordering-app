import { motion } from "framer-motion";
import React, { useState } from "react";
import { fadeInOut } from "../animations";

const LoginInput = ({
  placeholder,
  icon,
  inputState,
  inputStateFunc,
  type,
  
}) => {
  const [isFocus, setIsFocus] = useState(false)
  return (
    <motion.div {...fadeInOut}
      className={`flex items-center justify-center gap-4 bg-lightOverlay backdrop-blur-md w-full px-4 py-2`}
    >
      {icon}
      <input
        type={type}
        placeholder={placeholder}
        className={`w-full h-full bg-transparent text-headingColor text-lg font-semibold border-none outline-none ${isFocus ? "shawdow-md shadow-red-400": "shadow-none"} `}
        value={inputState}
        onChange={(e) => inputStateFunc(e.target.value)}
        onFocus={()=>setIsFocus(true)}
        onBlur={()=>setIsFocus(false)}
      />
    </motion.div>
  );
};

export default LoginInput;
