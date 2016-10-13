import React, { Component, PropTypes } from 'react';

export default class Panel extends Component {

  render() {
    return (
      <div className="icon-box-wrapper bg-default">
        <div className={`icon-box bg-${this.props.panel}`}>
          <i className={this.props.icon}></i>
        </div>
        <div className="icon-content">
          <span className="icon-text">
            { this.props.name.toLowerCase() }
          </span>
          <span className="icon-number">
            { this.props.count }
          </span>
        </div>
      </div>
    )
  }
};
