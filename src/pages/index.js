import React, { Component } from 'react';

import Layout from '../components/Layout';
import SearchBar from '../components/SearchBar';
import ResultTabs from '../components/ResultTabs';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      queryResult: null,
    };

    this.handleQuery = this.handleQuery.bind(this);
  }

  handleQuery = (result) => {
    this.setState({ queryResult: result });
  };

  render() {
    const { queryResult } = this.state;
    let tabs = '';

    if (queryResult) tabs = <ResultTabs queryResult={queryResult} />;
    return (
      <Layout>
        <div>
          <SearchBar updateQuery={this.handleQuery} />
          {tabs}
        </div>
      </Layout>
    );
  }
}

export default Index;
