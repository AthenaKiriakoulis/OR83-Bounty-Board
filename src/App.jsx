import {useState} from "react";
import { Route, Routes } from 'react-router-dom';
import Hello from "./Hello.jsx";
import Map from "./Map.jsx";
import Map2 from "./Map2.jsx";
import Login from "./Login.jsx";
import NotFound from "./NotFound.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import PrivateRoute from './privateRoute.jsx';
import "./App.css";


function App(){
    return (
      <AuthProvider>
        <div>
        <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/DemoMap' element={<Map2 />} />
            

            {/* Protected Routes */}
              <Route path='/Map' element={<PrivateRoute Component={Map} />} />
              <Route path='*' element={<PrivateRoute Component={NotFound} />} />
          </Routes>
        </div>
        </AuthProvider>
    );

}

export default App;