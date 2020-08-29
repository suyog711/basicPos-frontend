import React, { useState, useEffect } from 'react';
import Dashboard from '../views/dashboard';
import Register from '../views/register';
import { Switch, Route } from 'react-router-dom';
import Header from '../components/header';
import Sidebar from '../components/sidebar';
import Footer from '../components/footer';

// const StaffRouterDefs = () => {
//   return (
//     <Switch>
//       <Route path="/settings" component={EmailSettingsContainer} />
//       <Route path="/error_logs" component={ErrorLog} />
//       <Route exact path="/" component={FlaggedBookingsContainer} />
//       <Route component={Error404} />
//     </Switch>
//   );
// };

const ProtectedRoutes = () => {
  return (
    <Switch>
      <div>
        <Header />
        <Sidebar />
        <Route path="/dashboard" component={Dashboard} />
        <Route exact path="/" component={Dashboard} />
        <Footer />
      </div>
    </Switch>
  );
};

export default ProtectedRoutes;
