import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class SingleEntry extends Component {
  render() {
    return (
      <li><Link to={"/e/" + this.props.entry.name}>{this.props.entry.name}</Link> {this.props.entry.text}</li>
    );
  }
}

SingleEntry.propTypes = {
  // This component gets the entry to display through a React prop.
  // We can use propTypes to indicate it is required
  entry: PropTypes.object.isRequired,
};
