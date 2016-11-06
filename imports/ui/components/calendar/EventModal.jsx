import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class EventModal extends Component {

  showOptions() {
    return this.props.options.map((option, i) => (
      <option key={i} className="form-control">{option}</option>
    ));
  }

  render() {
    return (
      <div className="modal fade" id="calEventModal" tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 className="modal-title">Edit event</h4>
            </div>

            <form id="add-edit-event-form" onSubmit={this.props.handleSubmit.bind(this)}>
              <div className="modal-body">
              <div className="form-group">
                <div className="row">
                  <div className="col-xs-12 col-sm-4">
                    <label htmlFor="type">Select entry</label>
                    <select name="type" disabled={this.props.edit ? "disabled" : ""}
                            className="form-control"
                            onChange={this.props.handleChangeSelect.bind(this)}
                            value={this.props.selectedOption}
                            >
                      {this.showOptions()}
                    </select>
                  </div>
                  <div className="col-xs-12 col-sm-3">
                    <label htmlFor="start">Event Starts</label>
                    <input type="text" disabled
                          className="form-control"
                          value={moment(this.props.start).format("D.M.YYYY")}
                          />
                  </div>
                  <div className="col-xs-12 col-sm-3">
                    <label htmlFor="end">Event End</label>
                    <input type="text" disabled
                          className="form-control"
                          value={moment(this.props.end).format("D.M.YYYY")}
                          />
                  </div>
                </div>
              </div>
                <div className="form-group">
                  <label htmlFor="title">Event Title</label>
                  <input type="text" className="form-control"
                        onChange={this.props.handleChangeTitle.bind(this)}
                        value={this.props.title}
                        />
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-danger pull-left delete-event"
                id={this.props.id}
                onClick={this.props.handleDelete.bind(this)}
                >Delete Event</button>
                <button type="submit" className="btn btn-success">{this.props.edit ? "Update" : "Create" }</button>
                <button type="button" className="btn btn-default" data-dismiss="modal">Cancel</button>
              </div>
            </form>

          </div>
        </div>
      </div>
    );
  }
}
