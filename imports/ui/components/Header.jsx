import React from 'react';
import { Link } from 'react-router';

export default class Header extends React.Component {
  isActive(where) {
    if(location.pathname == "/"+where ) {
      return "active";
    }
  }

  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link className="navbar-brand" to="/"><i className="fa fa-diamond" aria-hidden="true"></i></Link>
          </div>

          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav">
              <li className={ this.isActive("") }><Link to="/">Home</Link></li>
              <li className={ this.isActive("about") }><Link to="about">About</Link></li>
              <li className={ this.isActive("create") }><Link to="create">Create entry</Link></li>
            </ul>

          </div>
        </div>
      </nav>
    );
  }
}
