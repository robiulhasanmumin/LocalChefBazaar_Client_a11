import React from 'react'
import Banner from '../component/Banner'
import DailyMeals from '../component/meals/DailyMeals'
import CustomerReviews from '../component/CustomerReviews'
 import useTitle from '../hooks/useTitle'
import MealCategory from '../component/MealCategory'
import Statistics from '../component/StatisticsPublic'
import Newsletter from '../component/NewsLetter'
import HowItWorks from '../component/HowItWorks'
import FAQ from '../component/Faq'
  const Home = () => {
  useTitle("Home")
  return (
    <div>
      <Banner></Banner>
      <MealCategory></MealCategory>
      <DailyMeals></DailyMeals>
      <CustomerReviews></CustomerReviews>
      <Statistics></Statistics>
      <Newsletter></Newsletter>
      <HowItWorks></HowItWorks>
      <FAQ></FAQ>
     </div>
  )
}

export default Home