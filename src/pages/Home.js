import React from 'react'
import Header from '../components/Header'
import Swipe from '../components/Swipe'
import PopularProducts from '../components/PopularProducts'
import Footer from '../components/Footer'
import Products from "../pages/Products"


const Home = () => {
  return (
    <div>
      <Header/>
      <Swipe/>
      <PopularProducts/>
      <Footer/>
      
    </div>
  )
}

export default Home
