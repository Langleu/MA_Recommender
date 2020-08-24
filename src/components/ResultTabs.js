/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import Graph from './Graph';

import '../styles/ResultTabs.scss';

const Tab = (props) => {
  const { activeTab, changeActiveTab, tab } = props;
  const { name } = tab;

  return (
    <li
      className={name === activeTab && 'is-active' ? 'is-active' : ''}
      onClick={() => changeActiveTab(name)}
    >
      <a style={{ textDecoration: 'none' }}>
        <span>{name}</span>
      </a>
    </li>
  );
};

Tab.defaultProps = {
  activeTab: '',
  changeActiveTab: () => {},
};
Tab.propTypes = {
  activeTab: PropTypes.string,
  changeActiveTab: PropTypes.func,
  tab: PropTypes.shape({
    name: PropTypes.string.isRequired,
    content: PropTypes.any,
  }).isRequired,
};

const Tabs = (props) => {
  const { tabList, activeTab, changeActiveTab } = props;
  return (
    <div className="tabs is-boxed is-fullwidth">
      <ul>
        {tabList.map((tab) => (
          <Tab tab={tab} key={tab.name} activeTab={activeTab} changeActiveTab={changeActiveTab} />
        ))}
      </ul>
    </div>
  );
};
Tabs.defaultProps = {
  activeTab: false,
  changeActiveTab: () => {},
};
Tabs.propTypes = {
  tabList: PropTypes.instanceOf(Array).isRequired,
  activeTab: PropTypes.string,
  changeActiveTab: PropTypes.func,
};

const ActiveTabContent = (props) => {
  const { content } = props;
  return <div>{content}</div>;
};

ActiveTabContent.defaultProps = {
  content: '',
};
ActiveTabContent.propTypes = {
  content: PropTypes.any,
};

class ResultTabs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: 'Recommendations',
      animate: false,
    };

    this.activeTabContent = this.activeTabContent.bind(this);
    this.changeActiveTab = this.changeActiveTab.bind(this);
  }

  tabList() {
    const { queryResult } = this.props;
    return [
      {
        name: 'Recommendations',
        content: JSON.stringify(queryResult),
      },
      {
        name: 'Graph',
        content: <Graph />,
      },
    ];
  }

  animate() {
    const { animate } = this.state;
    this.setState({ animate: !animate });
  }

  changeActiveTab(tab) {
    this.animate();
    this.setState({ activeTab: tab });
  }

  activeTabContent() {
    const { activeTab } = this.state;
    const activeIndex = this.tabList().findIndex((tab) => {
      return tab.name === activeTab;
    });

    return this.tabList()[activeIndex].content;
  }

  render() {
    const { activeTab, animate } = this.state;
    return (
      <section className="section">
        <div className="container">
          <Tabs
            tabList={this.tabList()}
            activeTab={activeTab}
            changeActiveTab={this.changeActiveTab}
          />

          <CSSTransition
            in={animate}
            classNames="fade"
            className="tabs-content"
            component="div"
            timeout={{ enter: 0, exit: 150 }}
          >
            <ActiveTabContent key={activeTab} content={this.activeTabContent()} />
          </CSSTransition>
        </div>
      </section>
    );
  }
}

ResultTabs.propTypes = {
  queryResult: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default ResultTabs;
