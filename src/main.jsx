import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import App from './App.jsx'
import './index.css'
import Register from './Pages/Register.jsx';
import Admin from './Pages/Admin.jsx';
import Dashboard from './Pages/Dashboard.jsx';
import ConfirmationScreen from './Pages/success.jsx';
import AppointmentForm from './Pages/AppointmentFrom.jsx';
import Form from './Pages/UserDetails.jsx';
import { AuthProvider } from './context/authContext.jsx';
import { AdminAuthProvider } from './context/AdminAuthContext.jsx';
const router = createBrowserRouter([
  {
    path:"/register",
    element:<Register></Register>
  },
  {
    path:"/register-admin",
    element:<Admin></Admin>
  },
  {
    path:"/Dashboard",
    element:<Dashboard></Dashboard>
  },
  {
    path:"/success",
    element:<ConfirmationScreen></ConfirmationScreen>
  },
  {
    path:"/",
    element:<AppointmentForm></AppointmentForm>
  },
  {
    path:"/user-details",
    element:<Form></Form>
  },
  {
    path:"/user",
    element:<Form></Form>
  },
  {
  path:"/success/:id",
  element:<ConfirmationScreen></ConfirmationScreen>
  }

])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AdminAuthProvider>
    <AuthProvider>
   <RouterProvider router={router}></RouterProvider>
   </AuthProvider>
   </AdminAuthProvider>
  </StrictMode>,
)
