import React, { Component } from 'react';
import Loading from '../components/Loading.jsx';
import { createContainer } from 'meteor/react-meteor-data';
import { Entries } from '../../api/Entries.js';
import SingleEntry from '../components/SingleEntry.jsx';
import ContactModal from '../components/ContactModal.jsx';

class ContactList extends Component {

  getSessionContacts() {
    return this.props.entries.map((entry) => (
      <SingleEntry key={entry._id} entry={entry} />
    ));
  }

  openModal() {
    $('#contactModal').modal();
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <div className="page-header result-area">
              <h3 className="dash-title">Favourite list <small>you can send message to them</small></h3>
            </div>
          </div>
          <div className="col-xs-12 send-message-wrapper">
            <button disabled={this.props.contactIds.length == 0 ? "disabled" : "" } className="btn btn-lg" onClick={this.openModal.bind(this)}>
              <i className="fa fa-envelope contact-favourites"></i>
              Contact favourites
            </button>
          </div>
          <div className="col-xs-12">
            { this.props.loading ? <Loading /> : this.getSessionContacts()}
          </div>
        </div>
        <ContactModal entries={this.props.entries} />
      </div>
    );
  }
}

export default ContactListContainer = createContainer(() => {
  const subscription = Meteor.subscribe('entries.published');
  const loading = !subscription.ready();

  let session = Session.get('contactIds');
  if(session === undefined) {
    session = [];
  }

  return {
    loading,
    entries: Entries.find( { _id: { $in: session } } ).fetch(),
    contactIds: Session.get('contactIds')
  };
}, ContactList);
