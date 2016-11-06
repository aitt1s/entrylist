import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Entries } from '../../api/Entries.js';
import SingleEntry from './SingleEntry.jsx';
import Loading from '../components/Loading.jsx';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class List extends Component {
  constructor() {
    super();
    this.state = {
      filters: [],
      filtersBus: [],
    };
  }

  filterThis() {
      const props = this.props;

      if(props.filters.length == 0 && props.filtersBus.length == 0) {
        return Entries.find();
      }

      if(props.filtersBus.length == 0) {
        return Entries.find({"area.muncode": {$in: props.filters}});
      }

      if(props.filters.length == 0) {
        return Entries.find({"bus.bcode": {$in: props.filtersBus}});
      }

      else {
        return Entries.find({"bus.bcode": {$in: props.filtersBus}, 'area.muncode': {$in: props.filters}});
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
  };
}, List);
