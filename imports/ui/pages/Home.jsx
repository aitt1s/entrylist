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
      searchFiltersBus: [],
      filterNumbersBus: [],
    };
  }

  getSearchFilters(val) {
    this.setState({
      searchFilters: val
    }, function() {
      this.getFilters();
    });
  }

  getSearchFiltersBus(val) {
    this.setState({
      searchFiltersBus: val
    }, function() {
      this.getFiltersBus();
    });
  }

  getFiltersBus() {
    this.setState({
      filterNumbersBus: []
    }, function() {
      return this.state.searchFiltersBus.map((filter) => (
        this.setState({
          filterNumbersBus: this.state.filterNumbersBus.concat([filter.bcode])
        })
      ));
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
      <div className="container data-container">
        <SearchHome
        getSearchFilters={this.getSearchFilters.bind(this)}
        getSearchFiltersBus={this.getSearchFiltersBus.bind(this)} />
        <List
        filters={this.state.filterNumbers}
        filtersBus={this.state.filterNumbersBus}
        />
      </div>
    );
  }
}
