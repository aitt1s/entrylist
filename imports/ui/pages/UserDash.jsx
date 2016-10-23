import React, { Component, PropTypes } from 'react';
import { Entries } from '../../api/Entries.js';
import { createContainer } from 'meteor/react-meteor-data';
import DashEntry from '../components/DashEntry.jsx';
import Entry from '../pages/Entry.jsx';
import { Link } from 'react-router';

class UserDash extends Component {
  constructor() {
    super();
    this.state = {
      editing: false,
      editId: "",
    };
  }

  entriesCount() {
    let a = this.props.entries;
    return a.length;
  }

  renderEntries() {
    return this.props.entries.map((entry) => (
      <div key={entry._id} className="single-entry">
        <DashEntry key={entry._id} entry={entry} getId={this.getId.bind(this)} />
      </div>
    ));
  }

  renderEdit(id) {
    return (
      <Entry paramsId={id} edit={this.state.editing} toggleStateOff={this.toggleStateOff.bind(this)} />
    );
  }

  createNew() {
    return (
      <div className="new-button">
        <Link to="/create"><div className="btn btn-success">Create new!</div></Link>
      </div>
    )
  }

  getId(id) {
    this.toggleState(id);
  }

  toggleStateOff() {
    this.setState({
      editing: !this.state.editing,
    });
  }

  toggleState(id) {
    this.setState({
      editing: !this.state.editing,
      editId: id,
    });
  }

  render() {
    return (
      <div className="container data-container">
        <div className="row">
          <div className="col-xs-12">
            <div className="page-header result-area">
              <h3 className="dash-title">Dashboard <small>edit and view your entry</small></h3>
            </div>
          </div>

          <div className="col-xs-12">
            {this.state.editing ? this.renderEdit(this.state.editId) : this.renderEntries()}
          </div>
          <div className="col-xs-12">
            {this.props.entries.length == 0 ?
              <h4 className="empty-dash">
                You have no entries, maybe create one?
              </h4>
               : "" }
            {this.state.editing ? "" : this.createNew()}
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
