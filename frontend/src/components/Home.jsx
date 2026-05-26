import React from 'react'

import HeroSection from './HeroSection'
import CategoryCrucial from './CategoryCrucial'
import LatestJob from './LatestJob'
import Footer from './Footer'

const Home = () => {
  return (
    <>
    <div>
       <HeroSection/>
       <CategoryCrucial/>
       <LatestJob/>
       <Footer/>
    </div>
    </>
  )
}

export default Home