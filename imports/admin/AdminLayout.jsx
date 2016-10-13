import React, { Component, PropTypes } from 'react';
import AdminSidebar from './AdminSidebar.jsx';
import Breadcrumbs from 'react-breadcrumbs';

export default class AdminLayout extends Component {

  render() {
    //let routes = this.props.routes;
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="sidebar-wrapper">
          {this.props.sidebar}
          </div>
          <div className="col-sm-4 col-lg-2 main adminlayout">
            <div className="container breadcrumb-wrapper">
              <Breadcrumbs
                separator= ""
                wrapperClass="breadcrumb"
                wrapperElement="ul"
                itemElement="li"
                routes={this.props.routes}
                params={this.props.params}
                excludes={['Root']}
              />
            </div>
            {this.props.main}
          </div>
        </div>
      </div>
    )
  }
};
