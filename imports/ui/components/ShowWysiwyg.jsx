import React, { Component } from 'react';
import {Editor, EditorState, convertFromRaw} from 'draft-js';

export default class ShowWysiwyg extends Component {
    constructor(props) {
      super(props);
      const {mainContent} = this.props;
      const contentState = convertFromRaw(mainContent);
      const editorState= EditorState.createWithContent(contentState);
      this.state = { editorState };
    }

    render() {
      const {editorState} = this.state;
      return (
        <div className="RichEditor-root">
          <div>
            <Editor
              editorState={editorState}
              readOnly="true"
            />
          </div>
        </div>
      );
    }
  }
