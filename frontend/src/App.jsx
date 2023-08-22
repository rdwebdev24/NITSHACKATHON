import {React,useState,useEffect} from 'react'
import Login from './Components/Login/Login'
import Main from './Components/MainPage/main/Main'
import Register from './Components/register/Register'
import { BrowserRouter, Route,Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/App.css'
import Landing from './Components/Landing/Landing'
import { Form } from './Components/MainPage/Form/Form'
import { Contribution } from './Components/MainPage/Contribution/Contribution'
const App = () => {


  return (
    <div>
      <BrowserRouter>
          <Routes>
              <Route path='/' element={<Landing/>}/>
              <Route path='/login' element={<Login/>}/>
              <Route path='/register' element={<Register/>}/>
              <Route path='/register' element={<Register/>}/>
              <Route path='/main' element={<Main />}>
                <Route path='request'element={<Form/>}/>
                <Route path='contribution' element={<Contribution/>}/>
              </Route>
          </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
