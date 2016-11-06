import React, { Component } from 'react';

export default class EntryEditPanel extends Component {

  render() {
    return (
      <div className="row edit-entry-panel">
        <div className="edit-panel col-xs-12">
          <div className="pull-right edit-controls">
            <button className="btn btn-success" onClick={this.props.handleSubmit.bind(this)}>Save</button>
            <button className="btn btn-default" onClick={this.props.onClick.bind(this)}>Back</button>
          </div>
        </div>
      </div>
    );
  }
}
