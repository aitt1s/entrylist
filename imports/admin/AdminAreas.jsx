import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import Reactable from 'reactable';
import { Areas, Provs } from '../api/Areas.js';

class AdminAreas extends Component {
  constructor() {
    super();
    this.state = {
      filtertext: ""
    };
  }

  renderAreas() {
    let Thead = Reactable.Thead,
    Th = Reactable.Th,
    Tr = Reactable.Tr,
    Td = Reactable.Td;

    return this.props.areas.map((area) => (
      <Tr key={area._id}>
        <Td column="Name">{area.mun}</Td>
        <Td column="Code">{area.muncode}</Td>
        <Td column="Province">{area.pro}</Td>
        <Td column="Province code">{area.procode}</Td>
        <Td column="Edit" value="edit-column">
          <div className="edit-wrapper">
            <div className="btn btn-xs table-buttons btn-info">
              <i className="fa fa-edit"></i> Edit
            </div>
            <div className="btn btn-xs table-buttons btn-danger">
              <i className="fa fa-trash"></i> Remove
            </div>
          </div>
        </Td>
      </Tr>
    ));
  }

  filterTextChanged(e){
    this.setState({ filtertext: e.target.value});
  }

  render() {
    var Table = Reactable.Table;
    return (
      <div className="container">
        <div className="panel panel-info">
          <div className="panel-heading">
            <div className="panel-heading-wrapper pull-left">
              <h4>Areas</h4>
            </div>
            <div className="search-wrapper pull-right">
              <input type="text" className="form-control reactable-filter-input" onChange={this.filterTextChanged.bind(this)} placeholder="Search"  />
            </div>
            <div className="clearfix"></div>
          </div>
          <Table className="table table-hover"
                  ref="areasTable"
                  id="table"
                  sortable={true}
                  defaultSort={{column: 'Name', direction: 'asc'}}
                  filterable={['Name', 'Code','Province','Province code']}
                  hideFilterInput
                  filterBy= {this.state.filtertext}
                  itemsPerPage={10}
                  >
            {this.renderAreas()}
          </Table>
        </div>
      </div>
    )
  }
};

AdminAreas.propTypes = {
  areas: PropTypes.array.isRequired,
};

export default createContainer(() => {
  Meteor.subscribe('areas');
  return {
    areas: Areas.find({}).fetch(),
  };
}, AdminAreas);
