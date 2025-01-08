import React from 'react'
import { Routes, Route } from "react-router-dom";


import Navbar from './components/Navigation/Navbar'
import Footer from './components/footer/Footer'
import footerContent from './content/footerContent.json'

import PrivateRoute from "./components/PrivateRoute"
import Men from './pages/Men'
import Women from './pages/Women'
import Kids from './pages/Kids'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Profile from './pages/Profile'
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import EmailVerify from './pages/EmailVerify';
import ItemUpload from './pages/ItemUpload';
import OrderCreation from './pages/OrderCreation';
import OrderPayment from './pages/OrderPayment';

const App = () => {
  return (
    <div className='flex flex-col'>
      <div><Navbar/></div>

    <div className='px-4'>
        <Routes>
            <Route path="/men" element={<Men/>} />
            <Route path='/women' element={<Women/>}/>
            <Route path='/kids' element={<Kids/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/signup' element={<Signup/>} />
            <Route path='/emailverify' element={<EmailVerify/>} />

             {/* Private Routes */}
            <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>}/>
            <Route path="/cart" element={<PrivateRoute><Cart /></PrivateRoute>}/>
            <Route path="/wishlist" element={<PrivateRoute><Wishlist /></PrivateRoute>}/>
            <Route path='/itemUpload' element={<PrivateRoute><ItemUpload/></PrivateRoute>}/>
            <Route path='/order_creation' element={<PrivateRoute><OrderCreation/></PrivateRoute>}/>
            <Route path='*' element={<Home/>}/>
          </Routes>
    </div>

      <div><Footer content={footerContent}/></div>
    </div>
  )
}

export default App