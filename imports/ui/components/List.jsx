import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Entries } from '../../api/Entries.js';
import SingleEntry from './SingleEntry.jsx';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

class List extends TrackerReact(React.Component){
  constructor() {
    super();
    this.state = {
      filters: [],
    };
  }

  filterThis() {
    let filterparams = this.props.filters;
    console.log(filterparams);
    if(filterparams.length == 0) {
      entries = Entries.find({}).fetch();
    }
    else {
    entries = Entries.find({area: {$elemMatch: {muncode: {"$in": this.props.filters}}}}).fetch();
    }
    return entries;
  }

  renderEntries() {
    return this.filterThis().map((entry) => (
      <SingleEntry key={entry._id} entry={entry} />
    ));
  }

  render() {
    return (
      <div className="row">
        <div className="col-xs-12">
          <div className="page-header result-area">
            <h3>Results <small>or would you like to <a href="#">explore</a>?</small></h3>
          </div>
        </div>
        <div className="col-xs-9">
          {this.renderEntries()}
        </div>
      </div>
    );
  }
}

List.propTypes = {
  entries: PropTypes.array.isRequired,
};

export default createContainer(() => {
  Meteor.subscribe('entries');
  return {
    entries: Entries.find({}).fetch(),
  };
}, List);
