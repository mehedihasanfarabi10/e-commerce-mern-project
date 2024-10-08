// eslint-disable-next-line no-unused-vars
import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Home from '../pages/Home';
import LogIn from '../pages/LogIn';
import Register from '../pages/Register';
import Cart from '../pages/Cart';
import Error from '../pages/Error'
import Navbar from '../layouts/Navbar';
import Footer from '../layouts/Footer';

const Index = () => {
  return (
    <BrowserRouter>
        <Navbar/>
        <main>
        <Routes>

        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<LogIn/>}/>
        <Route path="/logout" element={<LogIn/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/*" element={<Error/>}/>
        
        </Routes>    
        </main>
        <Footer/>
    </BrowserRouter>
    
  )
}

export default Index