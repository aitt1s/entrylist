import React, {Component} from 'react';
import SingleMessage from './SingleMessage.jsx';

export default class ListMessages extends Component {

  renderMessages() {
    return this.props.messages.map((message) => (
      <SingleMessage key={`message-id-${message._id}`} message={message} />
    ));
  }

  render() {
    return (
      <div className="col-md-9">
        <div className="list-group">
            {this.renderMessages()}
        </div>
      </div>
    );
  }
}
