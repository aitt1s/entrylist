import React from 'react';
import { Meteor } from 'meteor/meteor'
import { browserHistory} from 'react-router'
import { Link } from 'react-router';
import { createContainer } from 'meteor/react-meteor-data';
import { Messages } from '../../../api/Messages.js';
import { Entries } from '../../../api/Entries.js';

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
      }
    });
  }

  email(){
    if( !Meteor.user() ) {
    return "loading";
    }
    return Meteor.user().emails[0].address;
  }

  unreadCountAll() {
    Meteor.subscribe('messages');
    let count;
    count = Messages.find({'to': { $in: this.mapEntryIds() }, 'readed': false}).fetch();
    return count.length;
  }

  mapEntryIds() {
    return this.props.entries.map((entry) => (
      entry._id
    ));
  }

  render() {
    return (
      <ul className="nav navbar-nav navbar-right">
        <li>
          <Link to="/inbox">
            <i className="fa fa-inbox"></i> Inbox {this.unreadCountAll() > 0 ? <span className="badge header-badge">{this.unreadCountAll()}</span> : "" }
          </Link>
        </li>
        <li>
          <Link to="/dashboard">
            <i className="fa fa-tachometer"></i> Dashboard
          </Link>
        </li>
        <li>
          <a href="#">
            <i className="fa fa-user"></i> {this.email()}
          </a>
        </li>
        <li>
          <a onClick={ this.logOut }>
            <i className="fa fa-sign-out"></i> Logout
          </a>
        </li>
      </ul>
    );
  }
}

export default createContainer(() => {
  Meteor.subscribe('userData');
  Meteor.subscribe('entries');
  Meteor.subscribe('messages');

  return {
    userData: Meteor.users.find({}).fetch(),
    entries: Entries.find({"owner": Meteor.userId()}).fetch(),
    messages: Messages.find({}).fetch(),
  };
}, Logged);
