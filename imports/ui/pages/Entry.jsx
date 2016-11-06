import React, { Component, PropTypes } from 'react';
import { Entries } from '../../api/Entries.js';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { browserHistory} from 'react-router';
import Images from '../../api/Images.js';

// components
import Jumbotron from '../components/entry/Jumbotron.jsx';
import EntryEditPanel from '../components/entry/EntryEditPanel.jsx';
import AreasAndBusses from '../components/AreasAndBusses.jsx';
import ShowWysiwyg from '../components/ShowWysiwyg.jsx';
import Wysiwyg from '../components/Wysiwyg.jsx';
import EntryNav from '../components/EntryNav.jsx';
import AddSection from '../components/sections/AddSection.jsx';
import SingleSection from '../components/sections/SingleSection.jsx';

class Entry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      editorContent: {},
      name: "",
      text: "",
    }
  }

  handleNameChange(val) {
    this.setState({
      name: val,
    });
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

  handleContent(a) {
    this.setState({
      editorContent: a
    });
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

  createSectionStates() {
    if(this.props.entry.sections !== undefined && !this.props.loading) {
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
        <EntryEditPanel handleSubmit={this.handleSubmit.bind(this)}
                        onClick={this.onClick.bind(this)}
                        /> : ""}

        <Jumbotron image={this.props.image}
                  edit={this.props.edit}
                  entryId={res._id}
                  entryName={res.name}
                  entryText={res.text} />

        {res.sections ?
          <EntryNav links={res.sections}
                    edit={this.props.edit}
                    name={this.props.entry.name}
                    image={this.props.image} /> : "" }

        {this.props.loading ? "" :
          <AreasAndBusses area={this.props.entry.area}
                          busses={this.props.entry.bus}
                          edit={this.props.edit} /> }

        <div className="row">
          <div className="col-sm-12">
            <div className="content-box">
              {this.props.edit ?
                <Wysiwyg onSelectLanguage={this.handleContent.bind(this)} mainContent={res.mainContent} /> :
                <ShowWysiwyg mainContent={res.mainContent} /> }
            </div>
          </div>
        </div>
        {res.sections && !this.props.loading ? this.renderSections(res.sections) : ""}
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
  const subscription =  Meteor.subscribe('entries');
  const loading = !subscription.ready();

  Meteor.subscribe('images');

  if(paramsId) {
    return {
      loading,
      entry: Entries.findOne(paramsId),
      image: Images.findOne({'meta.entryId': paramsId}, {'meta.uxType': 'logo'}),
    }
  }

  let entry = Entries.findOne(params.id);
  return {
    loading,
    entry: entry,
    image: Images.findOne({'meta.entryId': params.id}, {'meta.uxType': 'logo'}),
  };
}, Entry);
