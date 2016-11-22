import React, {Component} from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Messages } from '../../api/Messages.js';
import { Entries } from '../../api/Entries.js';
import FolderList from '../components/inbox/FolderList.jsx';
import ListMessages from '../components/inbox/ListMessages.jsx';

class Inbox extends Component {
  constructor() {
    super();
    this.state = {
      filterFolder: ""
    }
  }

  filterFolderHandle(event) {
    event.preventDefault();
    let target = event.target.id;
    this.setState({
      filterFolder: target
    })
  }

  filterAllHandle(event) {
    event.preventDefault();
    this.setState({
      filterFolder: ""
    })
  }

  mapEntryIds() {
    return this.props.entries.map((entry) => (
      entry._id
    ));
  }

  filterMessages() {
    if(this.state.filterFolder === "") {
      const messages =  Messages.find({'to': { $in: this.mapEntryIds() }}, { sort: { createdAt: -1 }}).fetch();
      return messages;
    }
    return Messages.find({'to': this.state.filterFolder}, { sort: { createdAt: -1 } });
  }

  render() {
    return (
      <div className="container-fluid" id="messages">
        <div className="row">
          <FolderList entries={this.props.entries}
                      filterFolderHandle={this.filterFolderHandle.bind(this)}
                      filterAllHandle={this.filterAllHandle.bind(this)}
                      activeFolder={this.state.filterFolder}
                      messages={this.props.messages} />
          <ListMessages messages={this.filterMessages()}/>
        </div>
      </div>
    );
  }
}

export default createContainer (() => {
  Meteor.subscribe('messages');
  Meteor.subscribe('entries');
  const entries = Entries.find({"owner": Meteor.userId()}).fetch();
  const messages = Messages.find({}).fetch();

  return {
    messages: messages,
    entries: entries,
  };
}, Inbox);
