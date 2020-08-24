/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import Header from './Header';
import Footer from './Footer';

import '../styles/main.scss';
import 'bulma';
import '@fortawesome/fontawesome-svg-core/styles.css';

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 0,
      height: 0,
      mode: 'desktop',
    };
  }

  updateDimensions = () => {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight,
      mode: window.innerWidth > 1087 ? 'desktop' : 'mobile',
    });
  };

  componentDidMount = () => {
    this.updateDimensions();
    window.addEventListener('resize', _.throttle(this.updateDimensions, 500));
  };

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.updateDimensions);
  };

  render() {
    const { children } = this.props;
    return (
      <div className="page-wrapper">
        <Header />
        <section className="section content-wrapper">
          <div className="container is-fluid">{children}</div>
        </section>
        <Footer />
      </div>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
