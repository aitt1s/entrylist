import React, { Component, PropTypes } from 'react';
import Panel from './dash-components/Panel.jsx';
import { Entries } from '../api/Entries.js';
import { Areas } from '../api/Areas.js';
import { Bus } from '../api/Bus.js';
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

  areasCount() {
    let a = this.props.areas;
    return a.length;
  }

  busCount() {
    let a = this.props.busses;
    return a.length;
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-3 dash-users">
            <Panel name="Users" panel="" loading={this.props.usersReady} icon="fa fa-users" count={this.userCount()} />
          </div>
          <div className="col-xs-3 dash-entries">
            <Panel name="Entries" panel="" loading={this.props.entriesReady} icon="fa fa-list-alt" count={this.entriesCount()} />
          </div>
          <div className="col-xs-3">
            <Panel name="Areas" panel="" loading={this.props.areasReady} icon="fa fa-globe" count={this.areasCount()} />
          </div>
          <div className="col-xs-3">
            <Panel name="Types" panel="" loading={this.props.busReady} icon="fa fa-suitcase" count={this.busCount()} />
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
  const entriesSub = Meteor.subscribe('entries');
  const usersSub = Meteor.subscribe('users');
  const areasSub = Meteor.subscribe('areas');
  const busSub = Meteor.subscribe('bus');

  const entriesReady = !entriesSub.ready();
  const usersReady = !usersSub.ready();
  const areasReady = !areasSub.ready();
  const busReady = !busSub.ready();

  return {
    entriesReady,
    usersReady,
    areasReady,
    busReady,
    entries: Entries.find({}).fetch(),
    users: Meteor.users.find({}).fetch(),
    areas: Areas.find({}).fetch(),
    busses: Bus.find({}).fetch(),
  };
}, Dashboard);
