/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import Header from './Header';

import '../styles/main.scss';
import 'bulma';

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
      <div>
        <Header />
        <div className="container is-fluid">
          <div className="notification">{children}</div>
        </div>
      </div>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
