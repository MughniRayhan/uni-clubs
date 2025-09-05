import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ToastContainer } from 'react-toastify';
import { RouterProvider} from "react-router";
import { router } from './Router/Router.jsx';
import AuthProvider from './Context/AuthContext/AuthProvider.jsx';
import AOS from 'aos';



AOS.init({
      once: false
    });

createRoot(document.getElementById('root')).render(
  <StrictMode className='poppins'>
    <ToastContainer/>
   
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
   
  </StrictMode>,
)