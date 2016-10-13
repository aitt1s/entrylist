import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Entries } from '../api/Entries.js';
import Reactable from 'reactable'
import { Link } from 'react-router';


class AdminEntries extends Component {
  constructor() {
    super();
    this.state = {
      filtertext: ""
    };
  }

  entryCreatedAt(entry){
    return moment(entry).format("D.M.YYYY HH:mm:ss");;
  }

  searchEmail(id) {
    return Meteor.users.findOne(id).emails[0].address;
  }


  renderEntries() {
    let Tr = Reactable.Tr,
    Td = Reactable.Td;

    return this.props.entries.map((entry) => (
      <Tr key={entry._id}>
        <Td column="Name"><Link to={`/admin/entries/${entry._id}`}>{entry.name}</Link></Td>
        <Td column="Text">{entry.text}</Td>
        <Td column="id">{entry._id}</Td>
        <Td column="Owner">{this.searchEmail(entry.owner)}</Td>
        <Td column="CreatedAt">{this.entryCreatedAt(entry.createdAt)}</Td>
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
    var Table = Reactable.Table,
                Thead = Reactable.Thead,
                Th = Reactable.Th;
    return (
      <div className="container adminentries">
        <div className="panel panel-info">
          <div className="panel-heading">
            <div className="panel-heading-wrapper pull-left">
              <h4>Entries</h4>
            </div>
            <div className="search-wrapper pull-right">
              <input type="text" className="form-control reactable-filter-input" onChange={this.filterTextChanged.bind(this)} placeholder="Search"  />
            </div>
            <div className="clearfix"></div>
          </div>
          <Table className="table table-hover"
                  ref="entriesTable"
                  id="table"
                  sortable={true}
                  defaultSort={{column: 'CreatedAt', direction: 'desc'}}
                  filterable={['Name', 'Text', 'id','CreatedAt', 'Owner']}
                  hideFilterInput
                  filterBy= {this.state.filtertext}
                  noDataText="no data"
                  >
                  {/* <Thead>
                    <Th column="Name">
                      <strong className="name-header">Email</strong>
                    </Th>
                    <Th column="Text">
                      <em className="age-header">Text</em>
                    </Th>
                    <Th column="id">
                      <strong className="name-header">id</strong>
                    </Th>
                    <Th column="Owner">
                      <em className="age-header">Owner</em>
                    </Th>
                    <Th column="CreatedAt">
                      <strong className="name-header">Created At</strong>
                    </Th>
                    <Th column="Edit">
                      <em className="age-header"></em>
                    </Th>
                  </Thead>*/}
            {this.renderEntries()}
          </Table>
        </div>
      </div>
    )
  }
};

AdminEntries.propTypes = {
  entries: PropTypes.array.isRequired,
  users: PropTypes.array.isRequired,
};

export default createContainer(() => {
  Meteor.subscribe('entries');
  Meteor.subscribe('users');
  return {
    entries: Entries.find({}).fetch(),
    users: Meteor.users.find({}).fetch(),
  };
}, AdminEntries);
