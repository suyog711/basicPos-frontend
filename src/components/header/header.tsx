import React, { Component } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { showSuccessToast } from '../../lib/toastify';
import token from '../../helpers/token';

type HeaderProps = {
  //
};

const Header: React.FC<HeaderProps | any> = () => {
  const history = useHistory();

  const logout = async () => {
    await token.removeToken();
    showSuccessToast('Logout Successfully');
    window.location.reload();
  };

  return (
    <nav className="main-header navbar navbar-expand navbar-white navbar-light">
      {/* Left navbar links */}
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link" data-widget="pushmenu" href="#">
            <i className="fas fa-bars" />
          </a>
        </li>
        <li className="nav-item d-none d-sm-inline-block">
          <a href="../../index3.html" className="nav-link">
            Home
          </a>
        </li>
        <li className="nav-item d-none d-sm-inline-block">
          <a href="#" className="nav-link">
            Contact
          </a>
        </li>
      </ul>
      {/* SEARCH FORM */}
      <form className="form-inline ml-3">
        <div className="input-group input-group-sm">
          <input className="form-control form-control-navbar" type="search" placeholder="Search" aria-label="Search" />
          <div className="input-group-append">
            <button className="btn btn-navbar" type="submit">
              <i className="fas fa-search" />
            </button>
          </div>
        </div>
      </form>
      {/* Right navbar links */}
      <ul className="navbar-nav ml-auto">
        {/* Messages Dropdown Menu */}
        {/* Notifications Dropdown Menu */}

        <li className="nav-item dropdown">
          <a className="nav-link" data-toggle="dropdown" href="#">
            <i className="far fa-user" />
          </a>

          <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
            <span className="dropdown-item dropdown-header">menu</span>
            <div className="dropdown-divider" />
            <Link to="/profile" className="dropdown-item">
              <i className="fas fa-user-alt mr-2" /> Update Profile
            </Link>
            <div className="dropdown-divider" />
            <span style={{ cursor: 'pointer' }} onClick={logout} className="dropdown-item">
              <i className="fas fa-sign-out-alt mr-2" /> Logout
            </span>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
