import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home";
import AllMeals from "../component/meals/AllMeals";
import MealDetails from "../component/meals/MealDetails";
import AuthLayOut from "../layouts/AuthLayOut";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRoutes from "./PrivateRoutes";
import OrderMeal from "../component/meals/OrderMeal";
import DashboardLayout from "../layouts/DashboardLayout";
import ErrorPage from "../pages/ErrorPage";
import Profile from "../pages/dashboard/users/Profile";
import MyOrders from "../pages/dashboard/users/MyOrders";
import MyReviews from "../pages/dashboard/users/MyReviews";
import MyFavourites from "../pages/dashboard/users/MyFavourites";
import Payment from "../pages/dashboard/users/Payment";
import PaymentSuccess from "../pages/dashboard/users/PaymentSuccess";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    errorElement:<ErrorPage></ErrorPage>,
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
      },
      {
        path:"order-meal/:id",
        element:<PrivateRoutes><OrderMeal></OrderMeal></PrivateRoutes>
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
  },
  {
    path:"/dashboard",
    element:<PrivateRoutes><DashboardLayout></DashboardLayout></PrivateRoutes>,
    children:[
    { path: "profile", element: <PrivateRoutes><Profile/></PrivateRoutes> },
    { path: "my-orders", element: <PrivateRoutes><MyOrders/></PrivateRoutes> },
    { path: "my-reviews", element: <PrivateRoutes><MyReviews /></PrivateRoutes>  },
    { path: "favorites", element: <PrivateRoutes><MyFavourites /></PrivateRoutes> },
    {path:"payment", element:<Payment/>},
    {path:"payment-success", element:<PaymentSuccess/>}
    ]
  }
]);