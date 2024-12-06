import React from 'react'
import { Routes, Route } from "react-router-dom";


import Navbar from './components/Navigation/Navbar'
import Footer from './components/footer/Footer'
import footerContent from './content/footerContent.json'

import Men from './pages/Men'
import Women from './pages/Women'
import Kids from './pages/Kids'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup';

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
            <Route path='*' element={<Home/>}/>
          </Routes>
    </div>

      <div><Footer content={footerContent}/></div>
    </div>
  )
}

export default App