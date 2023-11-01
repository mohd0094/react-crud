import React from 'react';
import './App.css';
import {Route, Routes  } from 'react-router-dom';
import Update from './component/Update'
import View from './component/View'
import Create from './component/Create';
import Login from './component/auth/Login';
import Register from './component/auth/Register';

const App = () => {
  return (
  <>
    <Routes>
      <Route exact path={'/'} element={<View/>}/>
      <Route exact path={'/create'} element={<Create/>}/>
      <Route exact path={'/update'} element={<Update/>}/>
      <Route exact path={'/login'} element={<Login/>}/>
      <Route exact path={'/register'} element={<Register/>}/>
    </Routes>
  </>
  ) 
}

export default App;
