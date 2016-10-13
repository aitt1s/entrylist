import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { Entries } from '../../api/Entries.js';
import ShowWysiwyg from '../components/ShowWysiwyg.jsx';


export default class Entry extends TrackerReact(React.Component) {
  entry() {
    Meteor.subscribe('entries');
    return Entries.findOne(this.props.params.id);
  }

  renderAreas(areas) {
    return areas.map((area) => (
      <div key={area._id} className="place-label label label-primary">
        {area.mun}
      </div>
    ));
  }

  render() {
    let res = this.entry();
    if(!res) {
      return <div className="container">Loading</div>
    }

    return (
      <div className="container">
        <div className="jumbotron">
          <h2>{res.name}</h2>
          <p className="lead">{res.text}</p>
          <p><a className="btn btn-lg btn-success" href="#" role="button">Get started today</a></p>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <div className="alert alert-info">
              <strong>Business area:</strong> {this.renderAreas(res.area)}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <div className="content-box">
              <ShowWysiwyg
                mainContent={res.mainContent}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
};
