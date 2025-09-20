import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ToastContainer } from 'react-toastify';
import { RouterProvider} from "react-router";
import { router } from './Router/Router.jsx';
import AuthProvider from './Context/AuthContext/AuthProvider.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AOS from 'aos';



AOS.init({
      once: false
    });

 const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode className='poppins'>
    <ToastContainer/>
     <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
     </QueryClientProvider>
  </StrictMode>,
)