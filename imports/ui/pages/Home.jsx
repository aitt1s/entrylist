import React, {Component, PropTypes} from 'react';
import Jumbotron from '../components/Jumbotron.jsx';
import List from '../components/List.jsx';
import SearchHome from '../components/SearchHome.jsx';

export default class Home extends Component {

  render() {
    return (
      <div className="container data-container">
        <SearchHome />
        <List />
      </div>
    );
  }
}
