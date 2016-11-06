import React from 'react';
import { Link } from 'react-router';
import Logged from './nav/Logged.jsx';
import NotLogged from './nav/NotLogged.jsx';
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';


class Header extends React.Component {
  isActive(where) {
    if(location.pathname == "/"+where ) {
      return "active";
    }
  }

  renderContactsLink() {
    let number = this.props.contactIds;
    if(number !== undefined && number.length > 0) {
      return (
        <ul className="nav navbar-nav navbar-left">
          <li>
            <Link to="/contact">Contact List <span className="badge">{number.length}</span></Link>
          </li>
        </ul>
      );
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
              { this.renderContactsLink()  }
              { !! Meteor.userId() ? <Logged /> : <NotLogged /> }
            </div>
          </div>
        </nav>
      </header>
    );
  }
}

export default createContainer (() => {
  return {
    contactIds: Session.get('contactIds')
  };
}, Header);
