import React, { Component } from 'react';

import Layout from '../components/Layout';
import SearchBar from '../components/SearchBar';
import ResultTabs from '../components/ResultTabs';
import Loading from '../components/Loading';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      queryResult: null,
      loading: false
    };

    this.handleQuery = this.handleQuery.bind(this);
  }

  handleQuery = (result, kind = 'query') => {
    if (kind == 'loading') {
      this.setState({ loading: result });
    } else {
      this.setState({ queryResult: result });
    }
  };

  render() {
    const { queryResult, loading } = this.state;
    let tabs = '';
    let load = '';

    if (queryResult) tabs = <ResultTabs queryResult={queryResult} />;
    if (loading) {
      load = <Loading />;
      tabs = '';
    } else {
      load = '';
    }
    return (
      <Layout>
        <div>
          <SearchBar updateQuery={this.handleQuery} />
          {load}
          {tabs}
        </div>
      </Layout>
    );
  }
}

export default Index;
