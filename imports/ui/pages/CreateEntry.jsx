import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Entries } from '../../api/Entries.js';
import AreaComp from '../components/AreaComp.jsx';
import Busses from '../components/Busses.jsx';
import Wysiwyg from '../components/Wysiwyg.jsx';
import { browserHistory} from 'react-router';

class CreateEntry extends Component {
  constructor() {
    super();
    this.state = {
      addedSuggestions: [],
      addedBusses: [],
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

    if(name.length == 0 || text.length == 0 ) {
      return Bert.alert({
          title: 'Error',
          message: "Fill required fields",
          type: 'danger',
          style: 'growl-top-right',
          icon: 'fa-bell'
        });
    }

    if(Object.keys(mainContent).length === 0 && mainContent.constructor === Object) {
      return Bert.alert({
          title: 'Oh no..',
          message: "Tell us something about your business",
          type: 'danger',
          style: 'growl-top-right',
          icon: 'fa-bell'
        });
    }

    Meteor.call('entries.insert', name, text, area, mainContent, (err) => {
      if(err) {
        Bert.alert({
          title: 'Error',
          message: err.reason,
          type: 'danger',
          style: 'growl-top-right',
          icon: 'fa-bell'
        });
      }
      else {
        Bert.alert({
          title: 'Entry created!',
          message: 'Now, publish it!',
          type: 'success',
          style: 'growl-top-right',
          icon: 'fa-check'
        });
        browserHistory.push('/dashboard');
      }
    });
  }

  onUpdate(val){
    this.setState({
      addedSuggestions: this.state.addedSuggestions.concat([val])
    });
  }

  onUpdateBus(val){
    this.setState({
      addedBusses: this.state.addedBusses.concat([val])
    });
  }


  handleContent(a) {
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

  removeLabelBus(id){
    var array = this.state.addedBus.filter(function(item) {
      return item._id.toString() !== id
    });

    this.setState({
      addedBus: array
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

  renderAddedBusses() {
    return this.state.addedBusses.map((sug) => (
      <div key={sug._id} className="place-label label label-info">
        {sug.bname}
        <span className="pull-right-container remove-label" onClick={this.removeLabelBus.bind(this, sug._id.toString())}>
          <i className="fa fa-times"></i>
        </span>
      </div>
    ));
  }

  render() {
    return (
      <div className='container'>
        <div className="row">
          <div className="col-xs-12">
            <div className="page-header result-area">
              <h3 className="dash-title">Create an entry <small>tell us something!</small></h3>
            </div>
          </div>
        </div>
        <form className="new-entry" onSubmit="" id="createForm">
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
            {this.renderAddedBusses()}
          </div>
          <div className="form-group">
            <Busses onUpdateBus={this.onUpdateBus.bind(this)} />
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
