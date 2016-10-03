import React from 'react';

export default class Register extends React.Component {
  onSubmit(e) {
    e.preventDefault();
    console.log(e.target);
  }

  render() {
    return (
      <div className="container">
        <h2>Register</h2>
        <h2><small>Register with your or company's email. You can add more contact emails later.</small></h2>
        <form className="form-inline" onSubmit={this.onSubmit}>
          <div className="form-group register-form">
            <input type="email" className="form-control" id="exampleInputEmail3" placeholder="Email" />
          </div>
          <div className="form-group register-form">
            <input type="password" className="form-control" id="exampleInputPassword3" placeholder="Password" />
          </div>
          <button type="submit" className="btn btn-default">Let's go</button>
        </form>
      </div>
    );
  }
}
