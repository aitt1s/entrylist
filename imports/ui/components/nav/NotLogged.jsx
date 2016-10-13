import React from 'react';
import { Link } from 'react-router';

function NotLogged() {
  return (
    <ul className="nav navbar-nav pull-right">
      <li><Link to="/register">Register</Link></li>
      <li><Link to="/login">Login</Link></li>
    </ul>
  );
}

export default NotLogged;
