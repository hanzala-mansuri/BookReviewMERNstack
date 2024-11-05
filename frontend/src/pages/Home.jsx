import React from 'react'
import Hero from '../components/Home/Hero'
import RecentlyAdded from '../components/Home/RecentlyAdded'
import AllBooks from "./AllBooks"
import AboutUs from "./AboutUs"

const Home = () => {
  return (
    <div className='bg-zinc-900 text-white px-10 py-8'>
      <Hero/>
      <RecentlyAdded />
      <AboutUs />
      <AllBooks/>
    </div>
  )
}

export default Home
