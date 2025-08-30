import React from "react";
import { createBrowserRouter } from "react-router";
import Error from "../Pages/Error/Error";
import Home from "../Pages/Home/Home";
import Roots from "../LayOut/Roots";


 export const router = createBrowserRouter([
  {
    path: "/",
    Component: Roots,
    errorElement: Error ,
    children:[
        {   index: true,
            Component:Home
        }
    ]

  },
]);