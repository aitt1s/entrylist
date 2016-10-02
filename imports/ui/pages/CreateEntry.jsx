import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Entries } from '../../api/Entries.js';

export default class CreateEntry extends Component {

  handleSubmit(event) {
    event.preventDefault();

    // Find the text field via the React ref
    const name = ReactDOM.findDOMNode(this.refs.nameInput).value.trim();
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

    Entries.insert({
      name,
      text,
    });

    // Clear form
    ReactDOM.findDOMNode(this.refs.nameInput).value = '';
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
  }

  render() {
    return (
      <div className='container CreateEntry'>
        <h1>CreateEntry</h1>
        <form className="new-entry" onSubmit="">
          <input
            className="form-control entry-input"
            type="name"
            ref="nameInput"
            placeholder="Name of the entry"
          />
          <input
            className="form-control entry-input"
            type="text"
            ref="textInput"
            placeholder="Description text"
          />
          <button className="btn btn-default entry-input" onClick={this.handleSubmit.bind(this)}>Add entry</button>
        </form>
      </div>
    );
  }
}

export default CreateEntry;
