/* eslint-disable no-unused-vars */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import Graph from 'react-graph-vis';
import PropTypes from 'prop-types';
import useSWR from 'swr';
import { fetcher } from '../helper';

const RenderGraph = (props) => {
  const { deploymentId, queryResult } = props;
  const { data, error } = useSWR(`/api/v1/graph?deploymentId=${deploymentId}`, fetcher);

  if (error)
    return <div className="notification is-danger is-light">The backend ran into an error...</div>;
  if (!data) return <progress className="progress is-small is-light" max="100" />;

  const entry = queryResult.filter((q) => {
    return q.deployment.id === deploymentId;
  });

  const nodes = [];

  Object.entries(entry[0]).forEach((e) => {
    const [key, value] = e;
    switch (key) {
      case 'user':
        nodes.push({
          id: 1,
          label: value.name,
        });
        break;
      case 'repository':
        nodes.push({
          id: 2,
          label: value.name,
        });
        break;
      case 'deployment':
        nodes.push({
          id: 3,
          label: value.name,
        });
        break;
      default:
    }
  });

  const edges = [
    { from: 1, to: 2 },
    { from: 2, to: 3 },
  ];

  let i = 4; // add services to nodes
  data.forEach((e) => {
    nodes.push({
      id: i,
      label: e.service.name,
    });
    edges.push({
      from: i,
      to: 3, // always deployment
    });
    i += 1;
  });

  const graph = {
    nodes,
    edges,
  };

  const options = {
    layout: {
      hierarchical: true,
    },
    edges: {
      color: '#000000',
    },
    height: '500px',
  };

  const events = {
    select: (event) => {
      const { n, e } = event;
      // in case anything wants to be done with a selected node/edge
    },
  };

  return (
    <Graph
      graph={graph}
      options={options}
      events={events}
      getNetwork={(network) => {
        //  if you want access to vis.js network api you can set the state in a parent component using this property
      }}
    />
  );
};

RenderGraph.propTypes = {
  deploymentId: PropTypes.string.isRequired,
  queryResult: PropTypes.arrayOf(PropTypes.any).isRequired,
};

class Network extends Component {
  render() {
    const { deploymentId, queryResult } = this.props;

    let temp = (
      <div className="notification is-info is-light">
        Please select a row in the recommendations...
      </div>
    );
    if (deploymentId !== '') {
      temp = <RenderGraph queryResult={queryResult} deploymentId={deploymentId} />;
    }
    return <div>{temp}</div>;
  }
}

Network.propTypes = {
  deploymentId: PropTypes.string.isRequired,
  queryResult: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default Network;
