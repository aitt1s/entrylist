import React, {Component} from 'react';
import ReactDOM from 'react-dom';

export default class AddSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sectionType: "",
    };
  }

  sectionType(type) {
    this.setState({
      sectionType: type,
    });
  }

  clearSection() {
    this.setState({
      sectionType: "",
    });
    ReactDOM.findDOMNode(this.refs.sectionNameInput).value == "";
  }

  createSection() {
    let name = ReactDOM.findDOMNode(this.refs.sectionNameInput).value.trim();
    let section = {"_id": new Meteor.Collection.ObjectID().valueOf(), "type": this.state.sectionType, "name": name};

    Meteor.call('entries.addSection', this.props.entryId, section, (err) => {
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
          title: 'Section added',
          message: 'Now, fill it!',
          type: 'success',
          style: 'growl-top-right',
          icon: 'fa-check'
        });
      }
    });
    this.clearSection();
  }

  render() {
    return (
      <div className="col-xs-12 add-section-wrapper">
        <div className="dropdown create-section">
          <button className="btn btn-sm btn-success dropdown-toggle" type="button" id="dropdownMenuSections" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
            <i className="fa fa-plus"></i>
            <span className="section-text">
              {this.state.sectionType == 0 ? "Add section" : this.state.sectionType }
            </span>
            <span className="caret"></span>
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuSections">
            <li><a onClick={this.sectionType.bind(this,"Text section")}>Text section</a></li>
            <li><a onClick={this.sectionType.bind(this,"Media section")}>Media section</a></li>
            <li><a onClick={this.sectionType.bind(this,"Contact.section")}>Contact section</a></li>
          </ul>
        </div>
        { this.state.sectionType == 0 ? "" :
          <span>
          <input type="text" ref="sectionNameInput" className="create-section input-sm" placeholder="Section name" />
          <div className="create-session-wrapper">
            <button className="btn btn-success btn-sm create-section" onClick={this.createSection.bind(this)}>Create</button>
            <button className="btn btn-default btn-sm create-section" onClick={this.clearSection.bind(this)}>Cancel</button>
          </div>
          </span>
        }
      </div>
    );
  }
}
