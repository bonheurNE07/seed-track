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
import ViewFarmers from "../pages/ViewFarmers";
import ManageSpecies from "../pages/ManageSpecies";
import PrivateRoute from "@/routes/PrivateRoute"; 



function AppRoutes() {
  const Home = React.lazy(() => import('../pages/Home'));
  const NotFound = React.lazy(() => import('../pages/NotFound')); 

  return (
    <React.Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Layout />} >
          <Route index element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }/>

          <Route path="login" element={<Login />}/>
          <Route path="register" element={<Register />}/>
          <Route path="confirmation" element={<Confirmation />}/>
          <Route path="setpassword" element={<SetPassword />}/>

          <Route path="farmer-regist" element={
            <PrivateRoute>
              <FarmerRegistration />
            </PrivateRoute>
          }/>

          <Route path="seed-record" element={
            <PrivateRoute>
              <SeedRecord />
            </PrivateRoute>
          }/> 

          <Route path="farmers" element={
            <PrivateRoute>
              <ViewFarmers />
            </PrivateRoute>
          }/>
          <Route path="species" element={
            <PrivateRoute>
              <ManageSpecies />
            </PrivateRoute>
          }/>
        </Route>

        {/* Catch all 404 */}
        <Route path="*" element={<NotFound />} />
        </Routes>
    </React.Suspense>
  )
}

export default AppRoutes;
