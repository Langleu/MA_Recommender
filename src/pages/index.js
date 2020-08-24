import React, { Component } from 'react';

import Layout from '../components/Layout';
import Health from '../components/Health';
import SearchBar from '../components/SearchBar';
import ResultTabs from '../components/ResultTabs';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      queryResult: {},
    };

    this.handleQuery = this.handleQuery.bind(this);
  }

  handleQuery = (result) => {
    this.setState({ queryResult: result });
  };

  render() {
    const { queryResult } = this.state;

    return (
      <Layout>
        <div>
          <h1 className="title">Test</h1>
          <Health />
          <SearchBar updateQuery={this.handleQuery} />

          <p>{JSON.stringify(queryResult)}</p>
          <ResultTabs queryResult={queryResult} />
        </div>
      </Layout>
    );
  }
}

export default Index;
