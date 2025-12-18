import React from 'react'
import Banner from '../component/Banner'
import DailyMeals from '../component/meals/DailyMeals'
import CustomerReviews from '../component/CustomerReviews'

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <DailyMeals></DailyMeals>
      <CustomerReviews></CustomerReviews>
    </div>
  )
}

export default Home