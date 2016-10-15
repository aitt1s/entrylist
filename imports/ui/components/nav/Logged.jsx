import React from 'react';
import { Meteor } from 'meteor/meteor'
import { browserHistory} from 'react-router'
import { Link } from 'react-router';
import { createContainer } from 'meteor/react-meteor-data';

class Logged extends React.Component {

  logOut(e) {
    e.preventDefault();
    Meteor.logout((err) => {
      if (err) {
        Bert.alert({
          title: 'Error',
          message: err.reason,
          type: 'danger',
          style: 'growl-top-right',
          icon: 'fa-bell'
        });

      }
      else {
        Bert.alert({
          title: 'Logged out successfully',
          message: 'Please see you soon!',
          type: 'info',
          style: 'growl-top-right',
          icon: 'fa-hand-peace-o'
        });
        browserHistory.push('/');
      }
    });
  }

  email(){
    if( !Meteor.user() ) {
    return "loading";
    }
    return Meteor.user().emails[0].address;
  }

  render() {
    return (
      <ul className="nav navbar-nav navbar-right">
        <li><Link to="/admin">Admin</Link></li>
        <li><a onClick={ this.logOut } >Logout</a></li>
        <li><a href="#">{this.email()}</a></li>
      </ul>
    );
  }
}

export default createContainer(() => {
  Meteor.subscribe('userData');
  return {
    userData: Meteor.users.find({}).fetch(),
  };
}, Logged);
