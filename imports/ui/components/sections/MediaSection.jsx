import React, {Component} from 'react';
import FileUploadComponent from '../FileUpload.jsx';

export default class MediaSection extends Component {

  render() {

    return (
      <div className="wrapperi" id={this.props.section.name}>
        <FileUploadComponent />
      </div>
    );
  }
}
