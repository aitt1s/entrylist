import React, { Component } from 'react';
import { browserHistory} from 'react-router';

export default class AddToContactList extends Component {
  constructor() {
    super();
    this.state = {
      inContactList: false
    }
  }

  MoveToContacts(event) {
    event.preventDefault();
    browserHistory.push('/contact');
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
          <div className="btn-group contact-list-button" role="group">
            <a className={`btn remove-contact-list btn-${this.props.size} `} onClick={this.MoveToContacts.bind(this)} role="button">
              <i className="fa fa-check" aria-hidden="true"></i> In contact list
            </a>
            <a className={`btn remove-contact-list btn-${this.props.size}`} onClick={this.RemoveFromSession.bind(this)} role="button">
              <i className="fa fa-times"></i>
            </a>
          </div>
        );
      }
    }

    return (
      <div className="button-group" role="group">
        <a className={`btn add-contact-list btn-${this.props.size} contact-list-button`} onClick={this.addToSession.bind(this)}>
          <i className="fa fa-plus" aria-hidden="true"></i> Add to contact list
        </a>
      </div>
    );
  }
}
