import Home from "./components/Home/Home"
import Login from "./components/Login/Login"
import Signup from "./components/Signup/Signup"
import NavBar from "./components/NavBar/NavBar"
import { Route, Routes } from 'react-router-dom'
import TemplateSelection from "./components/Generate/TemplateSelection"
import Dashboard from "./components/Generate/Dashboard"
import UserDetails from "./components/Details/userDetails"
import ProfileDetails from "./components/Signup/ProfileDetails"


function App() {

  return (
    <div>
      <NavBar/>
      <Routes>
        <Route path='/' element = {<Home/>} />
        <Route path='/login' element = {<Login/>} />
        <Route path='/signup' element = {<Signup/>} />
        <Route path="/user-details" element = {<UserDetails/>}/>
        <Route path='/template-selection' element = {<TemplateSelection/>} />
        <Route path='/profile-details' element = {<ProfileDetails/>} />
        {/* To pass information or state between pages using router. Have to define the parameters in the Route definition for dynamic passing */}
        <Route path='/dashboard/:template' element = {<Dashboard/>} />

      </Routes>
    </div>
  )
}

export default App
