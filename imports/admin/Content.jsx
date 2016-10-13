import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import Reactable from 'reactable'


//import Item from './Item.jsx';


class Content extends Component {
  constructor() {
    super();
    this.state = {
      filtertext: ""
    };
  }

  userCreatedAt(user){
    return moment(user).format("D.M.YYYY HH:mm:ss");;
  }


  renderUsers() {
    let Thead = Reactable.Thead,
    Th = Reactable.Th,
    Tr = Reactable.Tr,
    Td = Reactable.Td;

    return this.props.users.map((user) => (
      <Tr key={user._id}>
        <Td column="Email">{user.emails[0].address}</Td>
        <Td column="id">{user._id}</Td>
        <Td column="CreatedAt">{this.userCreatedAt(user.createdAt)}</Td>
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
      <div className="col-xs-8 col-lg-10">
        <div className="container">
          <div className="panel panel-info">
            <div className="panel-heading">
              <div className="panel-heading-wrapper pull-left">
                <h4>Users</h4>
              </div>
              <div className="search-wrapper pull-right">
                <input type="text" className="form-control reactable-filter-input" onChange={this.filterTextChanged.bind(this)} placeholder="Search"  />
              </div>
              <div className="clearfix"></div>
            </div>
            <Table className="table table-hover"
                    ref="usersTable"
                    id="table"
                    sortable={true}
                    defaultSort={{column: 'CreatedAt', direction: 'desc'}}
                    filterable={['Email', 'id','CreatedAt']}
                    hideFilterInput
                    filterBy= {this.state.filtertext}
                    >
              {this.renderUsers()}
            </Table>
          </div>
          </div>
         </div>
    )
  }
};

Content.propTypes = {
  users: PropTypes.array.isRequired,
};

export default createContainer(() => {
  Meteor.subscribe('users');
  return {
    users: Meteor.users.find({}).fetch(),
  };
}, Content);
