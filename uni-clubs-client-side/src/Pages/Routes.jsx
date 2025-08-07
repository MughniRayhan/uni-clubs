import { createBrowserRouter, RouterProvider } from "react-router";

import React from "react";
import ReactDOM from "react-dom/client";
import Roots from "./Roots";

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage></ErrorPage>,
    Component: Roots,
    children:[
      {
        
      }
    ]
  },
  
]);
