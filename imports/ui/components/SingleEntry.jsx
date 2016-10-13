import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class SingleEntry extends Component {

  renderAreas(areas) {
    return areas.map((area) => (
      <div key={area._id} className="place-label-list label label-primary">
        {area.mun} <i className="fa fa-check-circle" aria-hidden="true"></i>
      </div>
    ));
  }

  render() {
    return (
      <div className="single-entry row">
        <div className="col-xs-10">
          <h3>
            <Link to={`e/${this.props.entry._id}`}>
              {this.props.entry.name}
            </Link>
          </h3>
          <p>
          {this.props.entry.text}
          </p>
        </div>
        <div className="col-xs-2 label-area">
          {this.renderAreas(this.props.entry.area)}
        </div>
      </div>
    );
  }
}

SingleEntry.propTypes = {
  // This component gets the entry to display through a React prop.
  // We can use propTypes to indicate it is required
  entry: PropTypes.object.isRequired,
};
