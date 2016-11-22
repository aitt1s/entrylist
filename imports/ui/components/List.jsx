import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Entries } from '../../api/Entries.js';
import SingleEntry from './SingleEntry.jsx';
import Loading from '../components/Loading.jsx';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class List extends Component {

  getAreaFilters() {
    let areas = [];
    if(Session.get('addedSuggestions') !== undefined) {
      return Session.get('addedSuggestions').map((filter) => (
        filter.muncode
      ));
    }
    else {
      return areas;
    }
  }

  getBusFilters() {
    let busses = [];
    if(Session.get('addedBusses') !== undefined) {
      return Session.get('addedBusses').map((filter) => (
        filter.bcode
      ));
    }
    else {
      return busses;
    }
  }

  filterThis() {
      if(this.getAreaFilters().length == 0 && this.getBusFilters().length == 0) {
        return Entries.find();
      }

      if(this.getBusFilters().length == 0) {
        return Entries.find({"area.muncode": {$in: this.getAreaFilters()}});
      }

      if(this.getAreaFilters().length == 0) {
        return Entries.find({"bus.bcode": {$in: this.getBusFilters()}});
      }

      else {
        return Entries.find({"bus.bcode": {$in: this.getBusFilters()}, 'area.muncode': {$in: this.getAreaFilters()}});
      }
  }

  renderEntries() {
    return this.filterThis().map((entry) => (
      <SingleEntry key={entry._id} entry={entry} />
    ));
  }

  render() {
    return (
      <div className="row list-row">
        <div className="col-xs-12">
          <ReactCSSTransitionGroup
            transitionName="example"
            transitionEnterTimeout={300}
            transitionLeaveTimeout={300} >
              { this.props.loading ? <Loading /> : this.renderEntries()}
          </ReactCSSTransitionGroup>
        </div>
      </div>
    );
  }
}

List.propTypes = {
  entries: PropTypes.array.isRequired,
};

export default ListContainer = createContainer(() => {
  const subscription = Meteor.subscribe('entries.published');
  const loading = !subscription.ready();
  return {
    loading,
    entries: Entries.find({}).fetch(),
    addedSuggestions: Session.get('addedSuggestions'),
    addedBusses: Session.get('addedBusses'),
  };
}, List);
