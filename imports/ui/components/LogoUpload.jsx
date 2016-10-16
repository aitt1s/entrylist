import {ReactMeteorData} from 'meteor/react-meteor-data';
import React from 'react';
import {Meteor} from 'meteor/meteor';
import IndividualFile from './FileIndividualFile.jsx';
import {_} from 'meteor/underscore';
import Images from '../../api/Images.js';

const FileUploadComponent = React.createClass({
  mixins: [ReactMeteorData],

  getInitialState(){
    return {
      uploading: [],
      progress: 0,
      inProgress: false
    }
  },

  getMeteorData() {
    var handle = Meteor.subscribe('images');
    return {
      docsReadyYet: handle.ready(),
      docs: Images.find().fetch() // Collection is Images
    };
  },

  deleteImage(id) {
    console.log("this");
    Images.remove(id);
  },

  uploadIt(e){
    "use strict";
    e.preventDefault();

    let self = this;

    if (e.currentTarget.files && e.currentTarget.files[0]) {
      // We upload only one file, in case
      // there was multiple files selected
      var file = e.currentTarget.files[0];

      // Remove old
      if (file) {
        let logo = Images.findOne({'meta.entryId': this.props.entryId}, {'meta.uxType': 'logo'});
        if(typeof logo !== "undefined" ) {
          this.deleteImage(logo.id);
          Bert.alert({
            title: 'Picture updated',
            message: 'Cool',
            type: 'success',
            style: 'growl-top-right',
            icon: 'fa-bell'
          });
        }

        let uploadInstance = Images.insert({
            file: file,
            meta: {
              locator: self.props.fileLocator,
              userId: Meteor.userId(), // Optional, used to check on server for file tampering
              entryId: this.props.entryId,
              uxType: "logo"
            },
            streams: 'dynamic',
            chunkSize: 'dynamic',
            allowWebWorkers: true // If you see issues with uploads, change this to false
          }, false);
          console.log(uploadInstance);

        self.setState({
          uploading: uploadInstance, // Keep track of this instance to use below
          inProgress: true // Show the progress bar now
        });

        // These are the event functions, don't need most of them, it shows where we are in the process
        uploadInstance.on('start', function () {
          console.log('Starting');
        });

        uploadInstance.on('end', function (error, fileObj) {
          console.log('On end File Object: ', fileObj);
        });

        uploadInstance.on('uploaded', function (error, fileObj) {
          console.log('uploaded: ', fileObj);

          // Remove the filename from the upload box
          self.refs['fileinput'].value = '';

          // Reset our state for the next file
          self.setState({
            uploading: [],
            progress: 0,
            inProgress: false
          });
        });

        uploadInstance.on('error', function (error, fileObj) {
          console.log('Error during upload: ' + error);
        });

        uploadInstance.on('progress', function (progress, fileObj) {
          console.log('Upload Percentage: ' + progress);
          // Update our progress bar
          self.setState({
            progress: progress
          })
        });

        uploadInstance.start(); // Must manually start the upload
        Bert.alert({
          title: 'Picture added',
          message: 'Cool',
          type: 'success',
          style: 'growl-top-right',
          icon: 'fa-bell'
        });
      }
    }
  },

  renderLogo() {
    const logo = Images.findOne({'meta.entryId': this.props.entryId}, {'meta.uxType': 'logo'});
    console.log(logo);
    if(typeof logo !== "undefined") {
      return <img src={logo.link()} className="img-responsive" />
    }
    return <h5>Add some logo!</h5>;
  },

  // This is our progress bar, bootstrap styled
  // Remove this function if not needed
  showUploads() {
    console.log('**********************************', this.state.uploading);

    if (!_.isEmpty(this.state.uploading)) {
      return <div>
        {this.state.uploading.file.name}

        <div className="progress progress-bar-default">
          <div style={{width: this.state.progress + '%'}} aria-valuemax="100"
             aria-valuemin="0"
             aria-valuenow={this.state.progress || 0} role="progressbar"
             className="progress-bar">
            <span className="sr-only">{this.state.progress}% Complete (success)</span>
            <span>{this.state.progress}%</span>
          </div>
        </div>
      </div>
    }
  },

  render() {
    if (this.data.docsReadyYet) {
      'use strict';

      let fileCursors = this.data.docs;
      return <div>
        <div className="row">
          <div className="col-md-12">
            <input type="file" id="fileinput" disabled={this.state.inProgress} ref="fileinput"
                 onChange={this.uploadIt}/>
          </div>
        </div>

        <div className="row m-t-sm m-b-sm">
          <div className="col-md-6">

            {this.showUploads()}

          </div>
          <div className="col-md-6">

            {this.renderLogo()}

          </div>
        </div>
      </div>
    }
    else return <div></div>
  }
});

export default FileUploadComponent;
