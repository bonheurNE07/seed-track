import React from "react";
import { Routes, Route } from "react-router-dom";
import Loading from "../components/Loading";
import Layout from "../components/Layout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Confirmation from "../pages/Confirmation";
import SetPassword from "../pages/SetPassword";
import FarmerRegistration from "../pages/FarmerRegistration";
import SeedRecord from "../pages/SeedRecord";


function AppRoutes() {
  const Home = React.lazy(() => import('../pages/Home'));
  const NotFound = React.lazy(() => import('../pages/NotFound')); 

  return (
    <React.Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Layout />} >
            <Route index element={<Home />}/>
            <Route path="login" element={<Login />}/>
            <Route path="register" element={<Register />}/>
            <Route path="confirmation" element={<Confirmation />}/>
            <Route path="setpassword" element={<SetPassword/>}/>

            <Route path="farmer-regist" element={<FarmerRegistration />}/>
            <Route path="seed-record" element={<SeedRecord />}/>
          </Route>

          {/* Catch-all 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
    </React.Suspense>
  )
}

export default AppRoutes;
