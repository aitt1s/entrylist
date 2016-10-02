import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Entries } from '../../api/Entries.js';
import SingleEntry from './SingleEntry.jsx';

class List extends Component {
  renderEntries() {
    return this.props.entries.map((entry) => (
      <SingleEntry key={entry._id} entry={entry} />
    ));
  }

  render() {
    return (
      <div className="container list-wrapper">
        <div className="panel panel-default">
          <div className="panel-heading">
            List of entries!
          </div>
          <div className="panel-body">
            {this.renderEntries()}
          </div>
        </div>
      </div>
    );
  }
}

List.propTypes = {
  entries: PropTypes.array.isRequired,
};

export default createContainer(() => {
  return {
    entries: Entries.find({}).fetch(),
  };
}, List);
