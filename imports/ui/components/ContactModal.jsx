import React, { Component } from 'react';

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
                  <input type="text" name="from" className="form-control" placeholder="Type your email address" />
                </div>

                <div className="form-group">
                  <label htmlFor="to">To</label>
                  <ul name="to" className="list-group">
                    {this.renderRecipients()}
                  </ul>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea type="text" className="form-control message-area" placeholder="Write a message" />
                </div>
              </div>
              <div className="modal-footer">
                <button type="submit" className="btn btn-success">Send</button>
                <button type="button" className="btn btn-default" data-dismiss="modal">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
