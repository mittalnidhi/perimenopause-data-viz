//write rafce and press enter 
import React from 'react'
import UserCard from './components/UserCard';
import "./index.css";
import { createBrowserRouter, RouterProvider, Outlet, Navigate} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import DIYData from './components/DIYData';

const router = createBrowserRouter(
  [
    {
    element: <Outlet />,   // NO navbar here
    children: [
      { path: "/", element: <Home /> }
    ]
  },

  {
    element: (
      <>
        <Navbar />
        <Outlet />
      </>
    ),
    children: [
      { path: "/about", element: <About /> },
      { path: "/diydata", element: <DIYData /> },
    ]
  }
]);

const App = () => {
  return (
      <div className = "parent">
        <RouterProvider router = {router}/>
        
      </div>
  )
}

export default App
