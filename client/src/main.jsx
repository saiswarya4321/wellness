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
import Mysessions from './Pages/Mysessions.jsx';
import Sessioneditor from './Pages/SessionEditor.jsx';
import CreateNew from './Pages/CreateNew.jsx';
import { Toaster } from 'react-hot-toast';

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
path:"mysessions",
      element:<Mysessions/>
    },
    {
path:"sessioneditor/:id",
      element:<Sessioneditor/>
    },
    {
path:"createnew",
      element:<CreateNew/>
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
