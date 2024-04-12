import logo from './logo.svg';
import './App.css';
import Home from './Componant/Home/Home';
import Header from './Componant/Header/Header';
import Register from './Componant/Register/Register';
import Login from './Componant/Login/Login';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './Componant/Layout/Layout';
import Notfound from './Componant/Notfound/Notfound';
import {RecoilRoot} from "recoil"
import ProtectedRoute from "./Componant/ProtectedRoute/ProtectedRoute"
import ProtectedRouteHome from './Componant/ProtectedRouteHome/ProtectedRouteHome';

function App() {
  let routers  = createBrowserRouter([
    {path: "" , element: <Layout/> , children:[
      {index :true , element :<ProtectedRouteHome><Register/></ProtectedRouteHome> },
      {path : "login" , element : <ProtectedRouteHome><Login/></ProtectedRouteHome>},
      {path : "note-app" , element : <ProtectedRoute><Home/></ProtectedRoute>},
      {path : "*" , element:<ProtectedRoute><Notfound/></ProtectedRoute>}
    ]}
  ])

  return <>
 
<RecoilRoot>
<RouterProvider router={routers}></RouterProvider>
</RecoilRoot>
 
  </>


}

export default App;
