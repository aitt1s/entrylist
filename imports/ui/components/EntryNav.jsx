import React, {Component} from 'react';
import Affix from './sections/Affix.jsx';
import ReactDOM from 'react-dom';

export default class EntryNav extends Component {

  renderLinks() {
    return this.props.links.map((section) => (
        <li key={section._id}><a href={`#${section.name}`}>{section.name}</a></li>
    ));
  }

  render() {
    return (
      <div className="row" id="navRow">
        { document.location.pathname == '/dashboard' ? "" :
        <div className="empty-wrap">
          <Affix className="affix-wrapper" id="affixWrap">
              <nav className="navbar" id="navEntryInside">
                <div className="container-fluid">
                  <div className="navbar-header">
                    <div className="navbar-brand">
                      { typeof this.props.image !== "undefined" || this.props.edit ?
                          <img
                          src={ typeof this.props.image !== "undefined" ?
                          this.props.image.link() :
                          "http://placehold.it/200x150/ffffff/cccccc?text=Logo" }
                          className="brand-image" />
                      : "" }
                      <p className="navbar-text">{this.props.name}</p>
                    </div>
                    <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse2">
                      <i className="fa fa-bars"></i>
                    </button>
                  </div>
                  <div className="collapse navbar-collapse" id="navbar-collapse2">
                    <ul className="nav navbar-nav">
                      <li><a href="#">Overview</a></li>
                      {this.renderLinks()}
                    </ul>
                  </div>
                </div>
              </nav>
          </Affix>
      </div> }
      </div>
    );
    let height = ReactDOM.findDOMNode(this.refs.affixWrap).offset().top;
    console.log(height);
  }
}
