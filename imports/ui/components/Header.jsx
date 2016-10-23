import React from 'react';
import { Link } from 'react-router';
import Logged from './nav/Logged.jsx';
import NotLogged from './nav/NotLogged.jsx';

export default class Header extends React.Component {
  isActive(where) {
    if(location.pathname == "/"+where ) {
      return "active";
    }
  }

  render() {
    return (
      <header className="main-header">
        <nav className="navbar navbar-static-top navbar-inverse">
          <div className="container-fluid">
            <div className="navbar-header">
              <Link to="/" className="navbar-brand"><b>entry</b>LIST</Link>
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse">
                <i className="fa fa-bars"></i>
              </button>
            </div>


            <div className="collapse navbar-collapse" id="navbar-collapse">
              { !! Meteor.userId() ? <Logged /> : <NotLogged /> }
            </div>
          </div>
        </nav>
      </header>
    );
  }
}
