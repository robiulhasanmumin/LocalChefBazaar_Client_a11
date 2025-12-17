import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home";
import AllMeals from "../component/meals/AllMeals";

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
      }
    ]
  },
]);