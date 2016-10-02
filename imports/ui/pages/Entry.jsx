import React, { Component, PropTypes } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { Entries } from '../../api/Entries.js';

export default class Entry extends TrackerReact(React.Component) {

  entry() {
    return Entries.findOne(this.props.params.id);
  }

  render() {
    let res = this.entry();
    if(!res) {
      return <div className="container">Loading</div>
    }

    return (
      <div className="container">
        <h3>{res.name}</h3>
      </div>
    )
  }
};
