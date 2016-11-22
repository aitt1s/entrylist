import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Messages } from '../../api/Messages.js';


export default class ContactModal extends Component {
  constructor(props) {
    super(props);
    this.reroll()
  }

  componentDidMount() {
    var self=this;
    $('#contactModal').on('hidden.bs.modal', function (e) {
      setTimeout(function() {
        self.reroll();
        self.forceUpdate();
      }, 300);
    })
  }

  reroll() {
    let entryObject = [];
    for(i=0; i < this.props.entries.length; i++) {
      let obj = {"id": this.props.entries[i]._id, "name": this.props.entries[i].name};
      entryObject.push(obj);
    };

    this.state = {
      recipients: entryObject,
    }
  }

  removeRecipient(event) {
    event.preventDefault();
    let target = event.target.id;
    let recipients = this.state.recipients;
    removedRecipient = recipients.filter(function(recipient) {
      return recipient.id.toString() !== target;
    });
    this.setState({
      recipients: removedRecipient,
    }, function() {
      if(this.state.recipients.length == 0) {
        $('#contactModal').modal('hide');
      };
    });
  }

  renderRecipients() {
    return this.state.recipients.map((favourite) => (
      <li key={`list-item-${favourite.id}`} className="list-group-item">
        {favourite.name}
        <span className="pull-right recipients" onClick={this.removeRecipient.bind(this)}>
          <i className="fa fa-times" id={favourite.id}></i>
        </span>
      </li>
    ));
  }

  handleSubmit(event) {
    event.preventDefault();
    const from = ReactDOM.findDOMNode(this.refs.fromInput).value.trim();
    const recipients = this.state.recipients;
    const subject = ReactDOM.findDOMNode(this.refs.subjectInput).value.trim();
    const message = ReactDOM.findDOMNode(this.refs.messageInput).value.trim();

    recipients.map((recipient) => (
      this.send(from, recipient.id, subject, message)
    ));
  }

  send(from, recipient, subject, message) {
    Meteor.call('messages.insert', from, recipient, subject, message, (err) => {
      if(err) {
        Bert.alert({
          title: 'Error',
          message: err.reason,
          type: 'danger',
          style: 'growl-top-right',
          icon: 'fa-bell'
        });
      }
      else {
        Bert.alert({
          title: 'Message sent',
          message: 'Cool!',
          type: 'success',
          style: 'growl-top-right',
          icon: 'fa-check'
        });
        $('#contactModal').modal('hide');
      }
    });
  }

  render() {
    return (
      <div className="modal fade" id="contactModal" tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 className="modal-title">Send message</h4>
            </div>

            <form id="add-edit-event-form">
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="from">From</label>
                  <input type="email" ref="fromInput" name="from" className="form-control" placeholder="Type your email address" />
                </div>

                <div className="form-group">
                  <label htmlFor="to">To</label>
                  <ul name="to" className="list-group">
                    {this.renderRecipients()}
                  </ul>
                </div>

                <div className="form-group">
                  <label htmlFor="from">Subject</label>
                  <input type="text" ref="subjectInput" name="from" className="form-control" placeholder="Type your email address" />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea type="text" ref="messageInput" className="form-control message-area" placeholder="Write a message" />
                </div>
              </div>
              <div className="modal-footer">
                <button type="submit" onClick={this.handleSubmit.bind(this)} className="btn btn-success">Send</button>
                <button type="button" className="btn btn-default" data-dismiss="modal">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
