import React from "react";
import './App.css';
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom';
import { UserProvider } from "./userContext/UserContext";
import Layout from "./Layout";
import { Home, Login, Register } from "./Pages/Index";
import './App.css';


const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout/>}>
      <Route path="/" element={<Home />} />
      <Route path="/Register" element={<Register />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/*" element={<Home />} />

    </Route>
  )
)


function App(){
  return (
    <UserProvider>
      <div className="App">
       <RouterProvider router={router}></RouterProvider>
      </div>
    </UserProvider>  
  )
}

export default App;