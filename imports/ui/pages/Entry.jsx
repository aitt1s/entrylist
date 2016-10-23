import React, { Component, PropTypes } from 'react';
import { Entries } from '../../api/Entries.js';
import ReactDOM from 'react-dom';
import ShowWysiwyg from '../components/ShowWysiwyg.jsx';
import Wysiwyg from '../components/Wysiwyg.jsx';
import AreaComp from '../components/AreaComp.jsx';
import Busses from '../components/Busses.jsx';
import EntryNav from '../components/EntryNav.jsx';
import AddSection from '../components/sections/AddSection.jsx';
import SingleSection from '../components/sections/SingleSection.jsx';
import LogoUpload from '../components/LogoUpload.jsx';
import { createContainer } from 'meteor/react-meteor-data';
import Images from '../../api/Images.js';
import { browserHistory} from 'react-router'

class Entry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      addedSuggestions: this.props.entry.area,
      addedBusses: this.props.entry.bus,
      editorContent: {},
    };
  }

  componentDidMount() {
    this.createSectionStates();
  }

  handleSubmit(event) {
    event.preventDefault();
    // Find the text field via the React ref
    const name = ReactDOM.findDOMNode(this.refs.nameInput).value.trim();
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
    const area = this.state.addedSuggestions;
    const bus = this.state.addedBusses;
    const mainContent = this.state.editorContent;
    Meteor.call('entries.update', this.props.entry._id, name, text, bus, area, mainContent, (err) => {
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
          title: 'Entry edited',
          message: 'Go and look at it!',
          type: 'success',
          style: 'growl-top-right',
          icon: 'fa-check'
        });
      }
    });

    if(typeof this.props.entry.sections !== "undefined") {
      return this.props.entry.sections.map((section, i) => (
        Meteor.call('entries.updateSection', this.props.entry._id, section._id, this.state[i])
      ));
    }

    this.props.toggleStateOff();
  }

  editName(res) {
    return (
      <input
        className="form-control entry-edit-input"
        type="name"
        ref="nameInput"
        defaultValue={res.name}
        placeholder="Name of the entry"
        id="nameInput"
        />
    );
  }

  editText(res) {
    return (
        <input
          className="form-control entry-edit-input"
          type="name"
          ref="textInput"
          defaultValue={res.text}
          placeholder="A short description text"
          id="textInput"
          />
    );
  }

  handleContent(a) {
    this.setState({
      editorContent: a
    });
  }

  editLabels(type, res) {
    return (
      <span className="pull-right-container remove-label"
          onClick={this.removeLabel.bind(this, type, res._id.toString())}>
        <i className="fa fa-times"></i>
      </span>
    );
  }

  deleteThisSection(sectionId) {
    Meteor.call('section.remove', this.props.entry._id, sectionId, (err) => {
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
          title: 'Section deleted',
          message: 'Now, make another!',
          type: 'danger',
          style: 'growl-top-right',
          icon: 'fa-bell'
        });
      }
    });
  }

  removeLabel(type, id){
    if(type === "Suggestion") {
      var array = this.state.addedSuggestions.filter(function(item) {
        return item._id.toString() !== id
      });

      this.setState({
        addedSuggestions: array
      });
    }
    if(type === "Busses") {
      var array = this.state.addedBusses.filter(function(item) {
        return item._id.toString() !== id
      });

      this.setState({
        addedBusses: array
      });
    }
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

  renderAreas(areas) {
    return areas.map((area) => (
      <div key={area._id} className="place-label label label-primary">
        { area.mun }
      </div>
    ));
  }

  renderBusses(bus) {
    return bus.map((bus) => (
      <div key={bus._id} className="place-label label label-info">
        { bus.bname }
      </div>
    ));
  }

  renderStateBusses() {
    return this.state.addedBusses.map((bus) => (
      <div key={bus._id} className="place-label label label-info">
        { bus.bname } { this.props.edit ? this.editLabels("Busses", bus) : "" }
      </div>
    ));
  }

  renderStateAreas() {
    return this.state.addedSuggestions.map((area) => (
      <div key={area._id} className="place-label label label-primary">
        { area.mun } { this.props.edit ? this.editLabels("Suggestion", area) : "" }
      </div>
    ));
  }

  onClick(e) {
    e.preventDefault;
    this.props.toggleStateOff();
  }

  getSectionId(id, val) {

    var index = this.props.entry.sections.findIndex(x => x._id==id);
    this.setState({
      [index]: val,
    }, function() {
    });
  }

  createSectionStates(id) {
    if(typeof this.props.entry.sections !== "undefined") {
      return this.props.entry.sections.map((section, i) => (
        this.setState({
          [i]: section.content ? section.content : {},
        })
      ));
    }
  }

  renderSections(sections) {
    return sections.map((section) => (
      <div key={`section-key${section._id}`} className="row">
        <SingleSection section={section} edit={this.props.edit} getSectionId={this.getSectionId.bind(this)} deleteThisSection={this.deleteThisSection.bind(this)} />
      </div>
    ));
  }

  render() {
    let res = this.props.entry;
    if(!res) {
      return <div className="container">Loading</div>
    }

    return (
      <div className="container entry-container">
        { this.props.edit ?
        <div className="row">
          <div className="edit-panel col-xs-12">
            <div className="pull-right edit-controls">
              <button className="btn btn-success" onClick={this.handleSubmit.bind(this)}>Save</button>
              <button className="btn btn-default" onClick={this.onClick.bind(this)}>Back</button>
            </div>
          </div>
        </div> : ""
        }
        <div className="jumbotron">
          <div className="row">
            { typeof this.props.image !== "undefined" || this.props.edit ?
              <div className="col-sm-3 logo-container">
                {this.props.edit ? <LogoUpload entryId={this.props.entry._id} /> : "" }
                <img
                src={ typeof this.props.image !== "undefined" ?
                this.props.image.link() :
                "http://placehold.it/200x150/ffffff/cccccc?text=Add a logo" }
                className={ typeof this.props.image !== "undefined" ?
                "img-responsive" : "img-responsive editing" } />
              </div>
            : "" }
            <div className="col-sm-9 name-container">
              {this.props.edit ? this.editName(res) : <h2 className="header-title">{res.name}</h2> }
              {this.props.edit ? this.editText(res) : <p className="lead">{res.text}</p> }
            </div>
          </div>
        </div>
        <div className="row" id="navRow">
          {res.sections ?
          <EntryNav links={res.sections} edit={this.props.edit} name={this.props.entry.name} image={this.props.image} /> : "" }
          <div className="row col-sm-12 info-container">
            <div className="col-sm-1">
              <p>Business:</p>
            </div>
            <div className="col-sm-11">
              {this.props.edit ? this.renderStateBusses() : this.renderBusses(res.bus)}
              {this.props.edit ?

              <div className="inline-block">
                <Busses onUpdateBus={this.onUpdateBus.bind(this)} />
              </div>
              : "" }
            </div>
            <div className="col-sm-1">
              <p>Area:</p>
            </div>
            <div className="col-sm-11">
              {this.props.edit ? this.renderStateAreas() : this.renderAreas(res.area)}
              {this.props.edit ?
                <div className="inline-block">
                  <AreaComp onUpdate={this.onUpdate.bind(this)} />
                </div>
                : "" }
              </div>
            </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <div className="content-box">
              {this.props.edit ?
                <Wysiwyg onSelectLanguage={this.handleContent.bind(this)} mainContent={res.mainContent} /> :
                <ShowWysiwyg mainContent={res.mainContent} /> }
            </div>
          </div>
        </div>
        {res.sections ? this.renderSections(res.sections) : ""}
        {this.props.edit ?
        <div className="row">
          <AddSection entryId={res._id} />
        </div>
        : "" }
      </div>
    )
  }
};

export default EntryContainer = createContainer(({paramsId, params, toggleStateOff}) => {
  Meteor.subscribe('entries');
  Meteor.subscribe('images');

  if(paramsId) {
    return {
      entry: Entries.findOne(paramsId),
      image: Images.findOne({'meta.entryId': paramsId}, {'meta.uxType': 'logo'}),
    }
  }

  let entry = Entries.findOne(params.id);
  return {
    entry: entry,
    image: Images.findOne({'meta.entryId': params.id}, {'meta.uxType': 'logo'}),
  };
}, Entry);
