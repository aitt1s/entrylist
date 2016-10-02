import React from 'react';

export default class Jumbotron extends React.Component {
  render() {
    return (
      <div className="jumbotron">
        <div className="container">
          <h2>Hello, world!</h2>
          <p>This is a template for a simple marketing or informational website. It includes a large callout called a jumbotron and three supporting pieces of content. Use it as a starting point to create something more unique.</p>
          <p><a className="btn btn-primary btn-lg" href="#" role="button">Learn more »</a></p>
        </div>
      </div>
    );
  }
}
