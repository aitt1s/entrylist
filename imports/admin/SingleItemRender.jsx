import React, { Component, PropTypes } from 'react';
import AdminSidebar from './AdminSidebar.jsx';
import Breadcrumbs from 'react-breadcrumbs';

export default class SingelItemRender extends Component {

  render() {
    //let routes = this.props.routes;
    return (
      <div className="singleitemrender">
            {this.props.children}
      </div>
    )
  }
};
