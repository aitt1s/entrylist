import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import AdminLink from "./AdminLink.jsx";


export default class AdminSidebar extends Component {

  render() {
    return (
      <div className="sidebar">
        <section id="sidebar">
          <div className="user-panel">
            <div className="pull-left image">
              <img src="/img/user2-160x160.jpg" className="img-circle" alt="User Image" />
            </div>
            <div className="pull-left info">
              <p>Juha Aittamaa</p>
              <a href="#"><i className="fa fa-circle text-success"></i> Online</a>
            </div>
          </div>

          <form action="#" method="get" className="sidebar-form">
            <div className="input-group">
              <input type="text" name="q" className="form-control" placeholder="Search..." />
              <span className="input-group-btn">
                <button type="submit" name="search" id="search-btn" className="btn btn-flat"><i className="fa fa-search"></i>
                </button>
              </span>
            </div>
          </form>

          <ul className="sidebar-menu">
            <li className="header">MAIN NAVIGATION</li>
            <li>
              <Link to="/admin">
                <i className="fa fa-tachometer"></i>
                <span>Dashboard</span>
                <span className="pull-right-container">
                  <i className="fa fa-angle-left pull-right"></i>
                </span>
              </Link>
              <ul className="treeview-menu menu-open">
                <li><a href="index.html"><i className="fa fa-circle-o"></i> Dashboard v1</a></li>
                <li className=""><a href="index2.html"><i className="fa fa-circle-o"></i> Dashboard v2</a></li>
              </ul>
            </li>
            <li><a href="#"><i className="fa fa-bar-chart"></i> Statistics</a></li>
            <li className="treeview">
              <Link to="/admin/users">
                <i className="fa fa-users"></i>
                Users
              </Link>
            </li>
            <li className="treeview">
              <Link to="/admin/entries">
                <i className="fa fa-list-alt"></i>
                Entries
              </Link>
            </li>
            <li className="treeview"><a href="#"><i className="fa fa-cog"></i> Settings</a></li>
            <li className="treeview"><a href="#"><i className="fa fa-list-ol"></i> Logs</a></li>
            <li className="treeview"><a href="#"><i className="fa fa-comment"></i> Comments</a></li>
            <li className="treeview"><a href="#"><i className="fa fa-youtube-play"></i> Media</a></li>
          </ul>
          </section>
      </div>
    )
  }
};
