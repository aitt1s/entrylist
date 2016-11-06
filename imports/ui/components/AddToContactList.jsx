import React, { Component } from 'react';

export default class AddToContactList extends Component {
  constructor() {
    super();
    this.state = {
      inContactList: false
    }
  }

  addToSession(event) {
    event.preventDefault();
    let ids = Session.get("contactIds");
    if(ids === undefined) {
      ids = [];
    }
    Session.set( "contactIds", ids.concat(this.props.entryId));
    this.toggleState();
  }

  RemoveFromSession(event) {
    event.preventDefault();
    let ids = Session.get("contactIds");
    let compare = this.props.entryId;
    newarray = ids.filter(function(id) {
      return id.toString() !== compare;
    });

    Session.set("contactIds", newarray);
    this.toggleState();
  }

  toggleState() {
    this.setState({
      inContactList: !this.state.inContactList,
    })
  }

  render() {
    if(Session.get("contactIds") !== undefined ) {
      if(Session.get("contactIds").includes(this.props.entryId)) {
        return (
          <a className={`btn btn-danger btn-${this.props.size} contact-list-button`} onClick={this.RemoveFromSession.bind(this)} role="button">
            Remove from contact list
          </a>
        );
      }
    }

    return (
      <a className={`btn btn-primary btn-${this.props.size} contact-list-button`} onClick={this.addToSession.bind(this)} role="button">
        Add to contact list
      </a>
    );
  }
}
