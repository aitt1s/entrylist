import React, {Component} from 'react';
import { Messages } from '../../../api/Messages.js';

export default class FolderList extends Component {

  isActive(id) {
    if(id === this.props.activeFolder) {
      return true;
    }
    return false;
  }

  unreadCount(id) {
    Meteor.subscribe('messages');
    let count;
    count = Messages.find({'to': id, 'readed': false}).fetch();
    return count.length;
  }

  unreadCountAll() {
    Meteor.subscribe('messages');
    let count;
    count = Messages.find({'to': { $in: this.mapEntryIds() }, 'readed': false}).fetch();
    return count.length;
  }

  mapEntryIds() {
    return this.props.entries.map((entry) => (
      entry._id
    ));
  }

  renderFolders() {
    return this.props.entries.map((entry) => (
      <a key={`entry-folder-${entry._id}`} id={entry._id}
        className={`list-group-item ${this.isActive(entry._id) ? "active" : ""}`}
        onClick={this.props.filterFolderHandle.bind(this)}>
        {this.unreadCount(entry._id) > 0 ? <span className="badge">{this.unreadCount(entry._id)}</span> : "" }
        <span className="fa fa-folder"></span> {entry.name}
      </a>
    ));
  }

  render() {
    return (
      <div className="col-md-3">
            <ul className="list-group">
              <a className={`list-group-item ${this.props.activeFolder === "" ? "active" : ""}`}
                onClick={this.props.filterAllHandle.bind(this)}>
                {this.unreadCountAll() > 0 ? <span className="badge">{this.unreadCountAll()}</span> : "" }
                <span className="fa fa-inbox"></span> All
              </a>
              {this.renderFolders()}
            </ul>
      </div>
    );
  }
}
