import React from 'react';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';

export default class MainLayout extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <main>{this.props.children}</main>

      </div>
    );
  }
}
