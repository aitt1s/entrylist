import React, { Component } from 'react';
import {Editor, EditorState, convertFromRaw} from 'draft-js';

export default class ShowWysiwyg extends Component {
  constructor(props) {
    super(props);
    if(this.props.hasOwnProperty("mainContent") && typeof this.props.mainContent !== "undefined" ) {
      if (this.props.mainContent.hasOwnProperty("blocks")) {
        const {mainContent} = this.props;
        const contentState = convertFromRaw(mainContent);
        const editorState = EditorState.createWithContent(contentState);
        this.state = { editorState };
        this.logState;
      }
      else {
        this.state = {editorState: EditorState.createEmpty()};
      }
    }
    else {
      this.state = {editorState: EditorState.createEmpty()};
    }
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
