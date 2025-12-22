import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home";
import AllMeals from "../component/meals/AllMeals";
import MealDetails from "../component/meals/MealDetails";
import AuthLayOut from "../layouts/AuthLayOut";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRoutes from "./PrivateRoutes";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children:[
      {
        index:true,
        Component: Home 
      },
      {
        path:"all-meals",
        Component:AllMeals
      },
      {
        path:"meal-details/:id",
        element:<PrivateRoutes><MealDetails></MealDetails></PrivateRoutes>,
      }
    ]
  },
  {
    path:"/",
    Component:AuthLayOut,
    children:[
      {
        path:"login",
        Component:Login
      },
      {
        path:"register",
        Component:Register
      }
    ]
  }
]);