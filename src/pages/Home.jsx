import React from 'react'
import Banner from '../component/Banner'
import DailyMeals from '../component/meals/DailyMeals'
import CustomerReviews from '../component/CustomerReviews'
import BeastMeal from '../component/BeastMeal'
import useTitle from '../hooks/useTitle'

const Home = () => {
  useTitle("Home")
  return (
    <div>
      <Banner></Banner>
      <DailyMeals></DailyMeals>
      <CustomerReviews></CustomerReviews>
      <BeastMeal></BeastMeal>
    </div>
  )
}

export default Home