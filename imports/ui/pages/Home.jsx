import React, {Component, PropTypes} from 'react';
import Jumbotron from '../components/Jumbotron.jsx';
import List from '../components/List.jsx';
import SearchHome from '../components/SearchHome.jsx';

export default class Home extends Component {
  constructor() {
    super()
    this.state = {
      searchFilters: [],
      filterNumbers: [],
    };
  }

  getSearchFilters(val) {
    this.setState({
      searchFilters: val
    }, function() {
      this.getFilters();
    });
  }

  getFilters() {
    this.setState({
      filterNumbers: []
    }, function() {
      return this.state.searchFilters.map((filter) => (
        this.setState({
          filterNumbers: this.state.filterNumbers.concat([filter.muncode])
        })
      ));
    });
  }

  render() {
    return (
      <div className="container">
        <SearchHome getSearchFilters={this.getSearchFilters.bind(this)} />
        <List filters={this.state.filterNumbers}
        />
      </div>
    );
  }
}
