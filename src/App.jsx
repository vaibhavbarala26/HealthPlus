import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Register from './Pages/Register'
import UserDetails from './Pages/UserDetails'
import Admin from './Pages/Admin'
import AppointmentForm from './Pages/AppointmentFrom'
import Dashboard from './Pages/Dashboard'
import Cancel from './components/Cancel'
import ConfirmationScreen from './Pages/success'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <ConfirmationScreen></ConfirmationScreen>
    </>
  )
}

export default App
