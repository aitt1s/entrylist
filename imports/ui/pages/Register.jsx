import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';
import { browserHistory} from 'react-router'

export default class Register extends Component {
  constructor(props) {
    super(props);
  }

  onSubmit(e) {
    e.preventDefault();
    let ele = $(e.target);
    let email = ele.find('#registerEmail').val();
    let password = ele.find('#registerPassword').val();
    let confirmPassword = ele.find('#registerConfirmPassword').val();
    if (password == confirmPassword && password !== "" && confirmPassword !== "") {
      let accountInfo = {
        email: email,
        password: password,
        createdAt: new Date()
      };
      Accounts.createUser(accountInfo, function(err) {
        if (err) {
          toaster.warning(err.reason);
        }
        else {
          toastr.success("Account created!");
          browserHistory.push('/');
        }
      });
    }
    else {
      toastr.warning("Passwords don't match!");
    }
  }

  render() {
    return (
      <div className="container">
        <h2>Let's start creating an entry</h2>
        <h2><small>Start with your or company's email. You can add more contact emails later.</small></h2>
        <form className="form-inline" onSubmit={this.onSubmit}>
          <div className="form-group register-form">
            <input type="email" className="form-control" id="registerEmail" placeholder="Email" />
          </div>
          <div className="form-group register-form">
            <input type="password" className="form-control" id="registerPassword" placeholder="Password" />
          </div>
          <div className="form-group register-form">
            <input type="password" className="form-control" id="registerConfirmPassword" placeholder="Confirm Password" />
          </div>
          <button type="submit" className="btn btn-default">Let's go</button>
        </form>
      </div>
    );
  }
}
