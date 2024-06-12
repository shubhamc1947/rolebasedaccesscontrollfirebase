// src/App.jsx
import React from 'react';
import HomePage from './pages/HomePage';
import UsersPage from './pages/UsersPage';
import LoginForm from './components/UserLogin';
import RoleForm from './components/RoleForm';
import UserForm from './components/UserForm';
import PageNotFound from './pages/PageNotFound';
import Navigation from './pages/Navbar';
import Logout from './components/Logout';

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  Outlet,
} from "react-router-dom";
import DemoStory from './components/DemoStory';
import ProtectedRoutes from './components/ProtectedRoutes';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children:[
      {
        path:"/",
        element:<ProtectedRoutes compo={HomePage} />
      },
      {
        path: "/users",
        element: <ProtectedRoutes compo={UsersPage}/>,
      },
      {
        path: "/roles",
        element: <ProtectedRoutes compo={RoleForm}/>,
      },  {
        path: "/demostory1",
        element: <ProtectedRoutes compo={DemoStory}/>,
      },   
      {
        path: "/pagenotfound",
        element: <PageNotFound/>,
      }
    ]
  },
  {
    path: "login",
    element: <LoginForm/>,
  },
  
  {
    path: "register",
    element: <UserForm/>,
  },
  {
    path: "*",
    element: <PageNotFound/>,
  }
]);


const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};


function Layout(){
  return(
    <>
      <div className="dashboardcont">
        <Navigation/>
        <Outlet/>
      </div>
      
    </>
  )
}


export default App;
