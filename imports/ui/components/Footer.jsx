import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Footer extends Component {
  render() {
    return (
      <div className="footerwrapper">
      <footer className="footer-distributed footer hidden-xs">
      			<div className="footer-right">
      				<a href="#"><i className="fa fa-facebook"></i></a>
      				<a href="#"><i className="fa fa-twitter"></i></a>
      				<a href="#"><i className="fa fa-linkedin"></i></a>
      				<a href="#"><i className="fa fa-github"></i></a>
      			</div>
      			<div className="footer-left">
      				<p className="footer-links">
              <Link to="/">Home</Link>
              <Link to="/about">About</Link>
              <Link to="/login">Login</Link>
              <Link to="/register" className="btn btn-info register-link">Register</Link>
      				</p>
      				<p><b>Entry</b>LIST &copy; 2016</p>
      			</div>
      		</footer>
          <footer className="footer-distributed mobile visible-xs">
          			<div className="footer-right">
          				<Link to="/"><i className="fa fa-search"></i></Link>
          				<Link to="/dashboard"><i className="fa fa-tachometer"></i></Link>
          				<Link to="/create"><i className="fa fa-pencil-square-o"></i></Link>
          				<Link to="/admin"><i className="fa fa-cog"></i></Link>
          			</div>
          		</footer>
          </div>
    );
  }
}
