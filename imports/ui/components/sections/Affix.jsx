import React, { Component, PropTypes } from 'react';

class Affix extends Component {

  constructor() {
    super();
    this.state = {
      affix: false,
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    const affix = this.state.affix;
    const offset = $('.content-box').offset().top;
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

    if (!affix && scrollTop >= offset) {
      this.setState({
        affix: true,
      });
    }

    if (affix && scrollTop < offset) {
      this.setState({
        affix: false,
      });
    }
  };

  render() {
    const affix = this.state.affix ? 'affix' : '';
    const { className, ...props } = this.props;

    return (
      <div {...props} className={`${className || ''} ${affix}`}>
        {this.props.children}
      </div>
    );
  }
}

export default Affix;
