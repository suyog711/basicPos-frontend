import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/header';
import Sidebar from './components/sidebar';
import Footer from './components/footer';
import Dashboard from './components/dashboard';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Register from './components/register';
import Login from './components/login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <Switch>
        <div>
          {false && <Header />}
          {false && <Sidebar />}
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          {false && <Footer />}
          <ToastContainer />
        </div>
      </Switch>
    </Router>
  );
}

export default App;
