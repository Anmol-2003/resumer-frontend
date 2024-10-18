import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import Signup from './components/Signup/Signup.jsx'
import Login from './components/Login/Login.jsx'
import App from './App.jsx'
import './index.css'


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App/>
  </BrowserRouter>
)
