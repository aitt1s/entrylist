import React, { Component, PropTypes } from 'react';
import { Entries } from '../../api/Entries.js';
import { createContainer } from 'meteor/react-meteor-data';


class UserDash extends Component {

  entriesCount() {
    let a = this.props.entries;
    return a.length;
  }

  renderEntries() {
    return this.props.entries.map((entry) => (
      <div key={entry._id} className="panel panel-default">
        <div className="panel-body">
          <h4>{entry.name}</h4>
          <div className="row">
            <div className="col-xs-3">
              <div className="small-box bg-red">
                <div className="inner">
                  <h2 className="box-indicator">65</h2>
                  <p>Unique Visitors</p>
                </div>
                <div className="icon">
                  <i className="fa fa-pie-chart"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ));
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-6">
            {this.renderEntries()}
          </div>
        </div>
      </div>
    )
  }
};

UserDash.propTypes = {
  entries: PropTypes.array.isRequired,
};

export default createContainer(() => {
  Meteor.subscribe('entries');

  return {
    entries: Entries.find({"owner": Meteor.userId()}).fetch(),
  };
}, UserDash);
