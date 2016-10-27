import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class EventModal extends Component {
  constructor(props) {
    super(props);
  }

  renderEntries() {
    return this.props.entries.map((entry) => (
      <option key={`event-${entry._id}`} value={entry._id}>{entry.name}</option>
    ));
  }

  checkEntryId() {
    if(typeof this.props.selected == "undefined") {
      return this.props.entries[0]._id;
    }
    return this.props.selected;
  }

  render() {
    console.log(this.checkEntryId());
    return (
      <div className="modal fade" id="calEventModal" tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 className="modal-title">{this.props.create ? "Create new event" : ""}{this.props.edit ? "Edit event" : ""}</h4>
            </div>

            <form id="add-edit-event-form" onSubmit={this.props.handleSubmit.bind(this)}>
              <div className="modal-body">
              <div className="form-group">
                <div className="row">
                  <div className="col-xs-12 col-sm-4">
                    <label htmlFor="type">Select entry</label>
                    <select name="type" onChange={this.props.handleChangeSelect.bind(this)}
                            value={this.checkEntryId()}
                            className="form-control">
                      {this.renderEntries()}
                    </select>
                  </div>
                  <div className="col-xs-12 col-sm-3">
                    <label htmlFor="start">Event Starts</label>
                    <input type="text" disabled
                          ref="start"
                          className="form-control"
                          onChange={this.props.handleChangeStart.bind(this)}
                          value={moment(this.props.start).format("D.M.YYYY")} />
                  </div>
                  <div className="col-xs-12 col-sm-3">
                    <label htmlFor="end">Event End</label>
                    <input type="text" disabled
                          ref="end"
                          className="form-control"
                          onChange={this.props.handleChangeEnd.bind(this)}
                          value={this.props.end ? moment(this.props.end).subtract(1, 'hours').format("D.M.YYYY") : ""} />
                  </div>
                </div>
              </div>
                <div className="form-group">
                  <label htmlFor="title">Event Title</label>
                  <input type="text"
                        onChange={this.props.handleChangeTitle.bind(this)}
                        ref="title"
                        className="form-control"
                        value={this.props.title} />
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-danger pull-left delete-event" id={this.props.eventId} onClick={this.props.handleDelete.bind(this)}>Delete Event</button>
                <button type="submit" className="btn btn-success">{this.props.create ? "Create" : ""}{this.props.edit ? "Save" : ""}</button>
                <button type="button" className="btn btn-default" data-dismiss="modal">Cancel</button>
              </div>
            </form>

          </div>
        </div>
      </div>
    );
  }
}
