import React from 'react';
import Dashboard from '../views/dashboard';
import { Switch, Route } from 'react-router-dom';
import Header from '../components/header';
import Sidebar from '../components/sidebar';
import Footer from '../components/footer';
import Profile from './../views/profile';

const ProtectedRoutes = () => {
  return (
    <Switch>
      <>
        <Header />
        <Sidebar />
        <Route path="/profile" component={Profile} />
        <Route path="/dashboard" component={Dashboard} />
        <Route exact path="/" component={Dashboard} />
        <Footer />
      </>
    </Switch>
  );
};

export default ProtectedRoutes;
