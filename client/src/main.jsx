import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Outerroot from './Components/Outerroot.jsx';
import Signup from './Pages/Signup.jsx';
import Root from './Components/Root.jsx';
import Login from './Pages/Login.jsx';
import Home from './Pages/Home.jsx';
import Dashboard from './Pages/Dashboard.jsx';



import { Toaster } from 'react-hot-toast';
import New from './Pages/New.jsx';
import Mysession from './Pages/Mysession.jsx';
import Sessioneditors from './Pages/Sessioneditors.jsx';


const router = createBrowserRouter([
  {
    path: "/dashboard",
    element: <Root />,
    children:[
      {
      path:"/dashboard",
      element:<Dashboard/>
    },
    {
path:"mysession",
      element:<Mysession/>
    },
    {
path:"sessioneditors/:id",
      element:<Sessioneditors/>
    },
    {
path:"new",
      element:<New/>
    },
  ]
  },
  {
    path: "/",
    element: <Outerroot />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
       {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
     <RouterProvider router={router} />
      <Toaster position="top-right" reverseOrder={false} />
  </StrictMode>,
)
