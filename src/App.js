
import './App.css';
// import { CreateContainer, Header, MainContainer } from "./components";

import { Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Header from './components/Header';
import MainContainer from './components/MainContainer';
import CreateContainer from './components/CreateContainer';
import Login from './components/Login';
import { useLoading } from './hooks/useLoading';
import { setLoadingInterceptor } from './interceptors/loadingInterceptor';
import { useEffect } from 'react';
import MainLoader from './components/MainLoader';
import { fadeInOut } from './animations';
import { motion } from "framer-motion";
import CartContainer from './components/CartContainer';
import CartPage from './components/CartPage';
import Checkout from './components/Checkout';
import AuthRoute from './components/AuthRoute'
import PaymentPage from './components/PaymentPage';
import OrderTrackPage from './components/OrderTrackPage';
import ProfilePage from './components/ProfilePage';
import OrdersPage from './components/OrdersPage';
import Menu from './components/Menu';
import Dashboard from './components/Dashboard';
import AdminRoute from './components/AdminRoute';
import FoodsAdminPage from './components/FoodsAdminPage';
import FoodEditPage from './components/FoodEditPage';
import UsersPage from './components/UsersPage';
import UserEdit from './components/UserEdit';

function App() {
  const { showLoading, hideLoading,isLoading } = useLoading();
  useEffect(() => {
    setLoadingInterceptor({ showLoading, hideLoading });
  }, []);
  return (
    <AnimatePresence>
      { isLoading && (
      <motion.div {...fadeInOut} className='fixed z-50 inset-0 bg-lightOverlay backdrop-blur-md flex items-center justify-center w-full'> 
    <MainLoader/>
    </motion.div> )}
    <div className='w-screen min-h-screen flex flex-col items-center justify-start bg-lightBackground'>
      <Header/>
   
          <Routes>
            <Route path="/*" element={<MainContainer />} />
            <Route path="/createItem" element={<CreateContainer />} />
            <Route path="/login" element={<Login />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/category/:category" element={<Menu />} />
            <Route path="/search/:searchTerm" element={<Menu />} />
            <Route path="/cart" element={<CartContainer />} />
            <Route path="/checkout" element={
              <AuthRoute>
            <Checkout />
            </AuthRoute>
            } />
            <Route path="/payment" element={
              <AuthRoute>
            <PaymentPage />
            </AuthRoute>
            } />
            <Route path="/track/:orderId" element={
              <AuthRoute>
            <OrderTrackPage />
            </AuthRoute>
            } />

<Route path="/profile" element={
              <AuthRoute>
            < ProfilePage/>
            </AuthRoute>
            } />

<Route  path="/orders/:filter?" element={
              <AuthRoute>
            <OrdersPage/>
            </AuthRoute>
            } />


<Route  path="/dashboard" element={
              <AuthRoute>
           <Dashboard />
            </AuthRoute>
            } />

<Route
        path="/admin/foods/"
        element={
          <AdminRoute>
            <FoodsAdminPage />
          </AdminRoute>
        }
      /> 

<Route
        path="/admin/addFood"
        element={
          <AdminRoute>
            <FoodEditPage />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/editFood/:foodId"
        element={
          <AdminRoute>
            <FoodEditPage />
          </AdminRoute>
        }
      />

<Route
        path="/admin/users"
        element={
          <AdminRoute>
            <UsersPage />
          </AdminRoute>
        }
      />

<Route
        path="/admin/editUser/:userId"
        element={
          <AdminRoute>
            <UserEdit />
          </AdminRoute>
        }
      />
          </Routes>

         

          
    
     </div> 
    </AnimatePresence>
  );
}

export default App;
