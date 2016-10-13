import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Entries } from '../../api/Entries.js';
import AreaComp from '../components/AreaComp.jsx';
import Wysiwyg from '../components/Wysiwyg.jsx';

class CreateEntry extends Component {
  constructor() {
    super();

    this.state = {
      addedSuggestions: [],
      editorContent: {},
    };
  }

  handleSubmit(event) {
    event.preventDefault();

    // Find the text field via the React ref
    const name = ReactDOM.findDOMNode(this.refs.nameInput).value.trim();
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
    const area = this.state.addedSuggestions;
    const mainContent = this.state.editorContent;

    Meteor.call('entries.insert', name, text, area, mainContent);

    // Clear form
    ReactDOM.findDOMNode(this.refs.nameInput).value = '';
    ReactDOM.findDOMNode(this.refs.textInput).value = '';

    toastr.success("Entry created!");
  }

  onUpdate(val){
    this.setState({
      addedSuggestions: this.state.addedSuggestions.concat([val])
    });
  }

  handleContent(a) {
    console.log(a);
    this.setState({
      editorContent: a
    });
  }

  removeLabel(id){
    var array = this.state.addedSuggestions.filter(function(item) {
      return item._id.toString() !== id
    });

    this.setState({
      addedSuggestions: array
    })
  }

  renderAdded() {
    return this.state.addedSuggestions.map((sug) => (
      <div key={sug._id} className="place-label label label-primary">
        {sug.mun}
        <span className="pull-right-container remove-label" onClick={this.removeLabel.bind(this, sug._id.toString())}>
          <i className="fa fa-times"></i>
        </span>
      </div>
    ));
  }

  render() {
    return (
      <div className='container CreateEntry'>
        <h1>CreateEntry</h1>
        <form className="new-entry" onSubmit="">
          <div className="form-group">
            <input
              className="form-control entry-input"
              type="name"
              ref="nameInput"
              placeholder="Name of the entry"
              />
          </div>
          <div className="form-group">
            <input
              className="form-control entry-input"
              type="text"
              ref="textInput"
              placeholder="Description text"
              />
          </div>
          <div className="form-group">
            {this.renderAdded()}
          </div>
          <div className="form-group">
            <AreaComp onUpdate={this.onUpdate.bind(this)} />
          </div>
          <div className="form-group">
            <Wysiwyg onSelectLanguage={this.handleContent.bind(this)} />
          </div>
          <div className="form-group">
            <button className="btn btn-default entry-input" onClick={this.handleSubmit.bind(this)}>Add entry</button>
          </div>
        </form>
      </div>
    );
  }
}

export default CreateEntry;
