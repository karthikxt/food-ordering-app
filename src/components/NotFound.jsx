import React from 'react';

import { Link } from 'react-router-dom';
export default function NotFound({ message, linkRoute, linkText }) {
  return (
    <div className='flex flex-col justify-center items-center font-thin text-2xl h-60'>
      {message}
      <Link to={linkRoute} className='font-base bg-red-400 text-white rounded-md p-3 m-4 opacity-80 cursor-pointer hover:opacity-100'>{linkText}</Link>
    </div>
  );
}

NotFound.defaultProps = {
  message: 'Nothing Found!',
  linkRoute: '/',
  linkText: 'Go To Home Page',
};
