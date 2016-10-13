import React, { Component, PropTypes } from 'react';
import Panel from './dash-components/Panel.jsx';
import { Entries } from '../api/Entries.js';
import { createContainer } from 'meteor/react-meteor-data';


class Dashboard extends Component {

  userCount() {
    let b = this.props.users;
    return b.length;
  }

  entriesCount() {
    let a = this.props.entries;
    return a.length;
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-3 dash-users">
            <Panel name="Users" panel="" icon="fa fa-users" count={this.userCount()} />
          </div>
          <div className="col-xs-3 dash-entries">
            <Panel name="Entries" panel="" icon="fa fa-list-alt" count={this.entriesCount()} />
          </div>
          <div className="col-xs-3">

          </div>
          <div className="col-xs-3">

          </div>
        </div>
      </div>
    )
  }
};

Dashboard.propTypes = {
  entries: PropTypes.array.isRequired,
};

export default createContainer(() => {
  Meteor.subscribe('entries');
  Meteor.subscribe('users');

  return {
    entries: Entries.find({}).fetch(),
    users: Meteor.users.find({}).fetch(),
  };
}, Dashboard);
