import React, {Component} from 'react';
import { Entries } from '../../../api/Entries.js';
import { Messages } from '../../../api/Messages.js';

export default class SingleMessage extends Component {

  getEntryName() {
    Meteor.subscribe('entryName');
    let name = Entries.findOne({'_id': this.props.message.to}).name;
    return name;
  }

  markAsReaded(event) {
    event.preventDefault();
    if(!this.props.message.readed) {
      let marked = !this.props.message.readed;
      Meteor.call('markAsReaded', this.props.message._id, marked)
    }
  }

  markAsUnReaded(event) {
    event.preventDefault();
    if(this.props.message.readed) {
      let marked = !this.props.message.readed;
      console.log("test");
      console.log(marked);
      Meteor.call('markAsReaded', this.props.message._id, marked)
    }
  }

  deleteMessage(event) {
    event.preventDefault();
    Meteor.call('messages.remove', this.props.message._id);
  }

  render() {
    return (
      <a onClick={this.markAsReaded.bind(this)} className="list-group-item" data-toggle="collapse" data-target={`#${this.props.message._id}`}>
        <h5 className="list-group-item-heading message-from">
        {this.props.message.from} <span className="message-time">to {this.getEntryName()} </span>
        {!this.props.message.readed ? <span className="badge badge-info">Unreaded</span> : "" }</h5>
        <span className="message-time pull-right">
          {moment(this.props.message.createdAt).format("D.M.YYYY")}
        </span>
        <h4 className="list-group-item-heading"><small>{this.props.message.subject}</small></h4>
        <div className="collapse" id={this.props.message._id}>
          <p className="list-group-item-text">{this.props.message.message}</p>
          <div className="message-controls">
            <button className="btn btn-sm" onClick={this.markAsUnReaded.bind(this)}>Mark as unread</button>
            <button className="btn btn-danger btn-sm" onClick={this.deleteMessage.bind(this)}>Delete</button>
          </div>
        </div>
      </a>
    );
  }
}
