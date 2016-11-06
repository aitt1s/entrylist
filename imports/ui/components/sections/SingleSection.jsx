import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Wysiwyg from '../Wysiwyg.jsx';
import ShowWysiwyg from '../ShowWysiwyg.jsx';
import MediaSection from './MediaSection.jsx';


export default class SingleSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      editorContent: {},
    };
  }

  handleContent(a) {
    this.setState({
      editorContent: a
    }, function() {
      this.props.getSectionId(this.props.section._id, this.state.editorContent);
    });
  }


  renderSections() {
      if(this.props.section.type == "Text section") {
          if(this.props.edit) {
            return <Wysiwyg key="0" onSelectLanguage={this.handleContent.bind(this)}
                    mainContent={this.props.section.content} />
          }
          else {
            return <ShowWysiwyg key="1" mainContent={this.props.section.content} />
          }
      }

      if(this.props.section.type == "Media section") {
          return <MediaSection section={this.props.section} />
      }
  }

  render() {
    return (
      <div className="col-xs-12 single-section" id={this.props.section.name}>
        <div className="section-header">
          <h4 className="anchor">{this.props.section.name}</h4>
          {this.props.edit?
            <button className="btn btn-default btn-xs pull-right remove-section"
                  onClick={this.props.deleteThisSection.bind(this, this.props.section._id)}>
            <i className="fa fa-times"></i> Remove section
          </button> : "" }
        </div>
        {this.renderSections()}
      </div>
    );
  }
}
