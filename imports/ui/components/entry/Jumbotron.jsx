import React, { Component } from 'react';
import LogoUpload from './LogoUpload.jsx';
import AddToContactList from '../AddToContactList.jsx';

export default class Jumbotron extends Component {

  editName(name) {
    return (
      <input
        className="form-control entry-edit-input"
        type="name"
        ref="nameInput"
        defaultValue={name}
        placeholder="Name of the entry"
        id="nameInput"
        />
    );
  }

  editText(text) {
    return (
        <input
          className="form-control entry-edit-input"
          type="name"
          ref="textInput"
          defaultValue={text}
          placeholder="A short description text"
          id="textInput"
          />
    );
  }

  render() {
    return (
      <div className="jumbotron">
        <div className="row">
          { typeof this.props.image !== "undefined" || this.props.edit ?
            <div className="col-sm-3 logo-container">
              {this.props.edit ? <LogoUpload entryId={this.props.entryId} /> : "" }
              <img
              src={ typeof this.props.image !== "undefined" ?
              this.props.image.link() :
              "http://placehold.it/200x150/ffffff/cccccc?text=Add a logo" }
              className={ typeof this.props.image !== "undefined" ?
              "img-responsive" : "img-responsive editing" } />
            </div>
          : "" }

          <div className="col-sm-9 name-container">
            {this.props.edit ? this.editName(this.props.entryName) : <h2 className="header-title">{this.props.entryName}</h2> }
            {this.props.edit ? this.editText(this.props.entryText) : <p className="lead">{this.props.entryText}</p> }
            {this.props.edit ? "" :
              <AddToContactList entryId={this.props.entryId} size="lg" />
            }
          </div>
        </div>
      </div>
    );
  }
}
