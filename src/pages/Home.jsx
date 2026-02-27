import React from 'react'
import Banner from '../component/Banner'
import DailyMeals from '../component/meals/DailyMeals'
import CustomerReviews from '../component/CustomerReviews'
 import useTitle from '../hooks/useTitle'
import MealCategory from '../component/MealCategory'
import Statistics from '../component/StatisticsPublic' 
const Home = () => {
  useTitle("Home")
  return (
    <div>
      <Banner></Banner>
      <MealCategory></MealCategory>
      <DailyMeals></DailyMeals>
      <Statistics></Statistics>
      <CustomerReviews></CustomerReviews>
     </div>
  )
}

export default Home