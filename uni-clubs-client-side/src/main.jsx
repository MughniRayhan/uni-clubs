import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ToastContainer } from 'react-toastify';
import { RouterProvider} from "react-router";
import { router } from './Router/Router.jsx';




createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToastContainer/>
   
      <RouterProvider router={router} />
   
  </StrictMode>,
)