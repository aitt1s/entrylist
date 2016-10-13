import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Editor, EditorState, ContentState, RichUtils, convertToRaw} from 'draft-js';

export default class Wysiwyg extends Component {
    constructor(props) {
      super(props);
      this.state = {editorState: EditorState.createEmpty()};
      this.focus = () => this.refs.editor.focus();
      this.onChange = function(editorState) {
        this.setState({editorState});
        this.logState();
      };
      this.handleKeyCommand = (command) => this._handleKeyCommand(command);
      this.onTab = (e) => this._onTab(e);
      this.toggleBlockType = (type) => this._toggleBlockType(type);
      this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);
      this.logState = () => this.handleLangChange(this.state.editorState.getCurrentContent());
    }

    handleLangChange(lang) {
      this.props.onSelectLanguage(convertToRaw(lang));
    }

    _handleKeyCommand(command) {
      const {editorState} = this.state;
      const newState = RichUtils.handleKeyCommand(editorState, command);
      if (newState) {
        this.onChange(newState);
        return true;
      }
      return false;
    }

    _onTab(e) {
      const maxDepth = 4;
      this.onChange(RichUtils.onTab(e, this.state.editorState, maxDepth));
    }

    _toggleBlockType(blockType) {
      this.onChange(
        RichUtils.toggleBlockType(
          this.state.editorState,
          blockType
        )
      );
    }

    _toggleInlineStyle(inlineStyle) {
      this.onChange(
        RichUtils.toggleInlineStyle(
          this.state.editorState,
          inlineStyle
        )
      );
    }

    render() {
      const {editorState} = this.state;

      // If the user changes block type before entering any text, we can
      // either style the placeholder or hide it. Let's just hide it now.
      let className = 'form-control wysiwyg-editor';
      var contentState = editorState.getCurrentContent();
      if (!contentState.hasText()) {
        if (contentState.getBlockMap().first().getType() !== 'unstyled') {
          className += ' RichEditor-hidePlaceholder';
        }
      }

      return (
        <div className="RichEditor-root">
          <BlockStyleControls
            editorState={editorState}
            onToggle={this.toggleBlockType}
          />
          <InlineStyleControls
            editorState={editorState}
            onToggle={this.toggleInlineStyle}
          />
          <div className={className} onClick={this.focus}>
            <Editor
              blockStyleFn={getBlockStyle}
              customStyleMap={styleMap}
              editorState={editorState}
              handleKeyCommand={this.handleKeyCommand}
              onChange={this.onChange.bind(this)}
              onTab={this.onTab}
              placeholder="Tell something about your business..."
              ref="editor"
              spellCheck={true}
            />
          </div>
          <input
   onClick={this.launchTwo}
   type="button"
   value="Log State"
 />
        </div>
      );
    }
  }

  // Custom overrides for "code" style.
  const styleMap = {
    CODE: {
      backgroundColor: 'rgba(0, 0, 0, 0.05)',
      fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
      fontSize: 16,
      padding: 2,
    },
  };

  function getBlockStyle(block) {
    switch (block.getType()) {
      case 'blockquote': return 'RichEditor-blockquote';
      default: return null;
    }
  }

  class StyleButton extends React.Component {
    constructor() {
      super();
      this.onToggle = (e) => {
        e.preventDefault();
        this.props.onToggle(this.props.style);
      };
    }

    render() {
      let className = 'btn btn-default btn-sm wysiwyg-button';
      if (this.props.active) {
        className += ' btn-primary';
      }

      return (
        <div className={className} onMouseDown={this.onToggle}>
          <i className={this.props.icon}></i> {this.props.label}
        </div>
      );
    }
  }

  const BLOCK_TYPES = [
    {label: 'H1', style: 'header-one', icon: ''},
    {label: 'H2', style: 'header-two', icon: ""},
    {label: 'H3', style: 'header-three', icon: ""},
    {label: 'H4', style: 'header-four', icon: ""},
    {label: 'Blockquote', style: 'blockquote', icon: "fa fa-quote-right"},
    {label: 'UL', style: 'unordered-list-item', icon: "fa fa-list-ul"},
    {label: 'OL', style: 'ordered-list-item', icon: "fa fa-list-ol"},
  ];

  const BlockStyleControls = (props) => {
    const {editorState} = props;
    const selection = editorState.getSelection();
    const blockType = editorState
      .getCurrentContent()
      .getBlockForKey(selection.getStartKey())
      .getType();

    return (
      <div className="btn-group wysiwyg-controls">
        {BLOCK_TYPES.map((type) =>
          <StyleButton
            key={type.label}
            active={type.style === blockType}
            label={type.label}
            onToggle={props.onToggle}
            style={type.style}
            icon={type.icon}
          />
        )}
      </div>
    );
  };

  var INLINE_STYLES = [
    {label: 'Bold', style: 'BOLD', icon: "fa fa-bold"},
    {label: 'Italic', style: 'ITALIC', icon: "fa fa-italic"},
    {label: 'Underline', style: 'UNDERLINE', icon: "fa fa-underline"},
    {label: 'Monospace', style: 'CODE', icon: "fa fa-code"},
  ];

  const InlineStyleControls = (props) => {
    var currentStyle = props.editorState.getCurrentInlineStyle();
    return (
      <div className="btn-group wysiwyg-controls">
        {INLINE_STYLES.map(type =>
          <StyleButton
            key={type.label}
            active={currentStyle.has(type.style)}
            label={type.label}
            onToggle={props.onToggle}
            style={type.style}
            icon={type.icon}
          />
        )}
      </div>
    );
  };
