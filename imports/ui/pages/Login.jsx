import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';
import { browserHistory} from 'react-router'

export default class Login extends Component {

  onSubmit(e) {
    e.preventDefault();

    var el = $(e.target);
    var email = el.find('#email').val();
    var password = el.find('#password').val();

    Meteor.loginWithPassword(email, password, (err) => {
      if(err) {
        toaster.warning(err.reason);
      }
      else {
        toastr.success("Login completed!");
        browserHistory.push('/');
      }
    });
  }

  render() {
    return (
      <div className="container">
        <h2>Let's login</h2>
        <h2><small>Login with your credentials.</small></h2>
        <form className="form-inline" onSubmit={this.onSubmit}>
          <div className="form-group register-form">
            <input type="email" className="form-control" id="email" placeholder="Email" />
          </div>
          <div className="form-group register-form">
            <input type="password" className="form-control" id="password" placeholder="Password" />
          </div>
          <button type="submit" className="btn btn-default">Login</button>
        </form>
      </div>
    );
  }
}
