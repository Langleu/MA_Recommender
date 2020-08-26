/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

const TableEntry = (props) => {
  const { score, user, repository, deployment, rawUrl } = props;
  return (
    <tr>
      <td>{score}</td>
      <td>
        <a href={`https://github.com/${user}`} target="_blank" rel="noreferrer">
          {user}
        </a>
      </td>
      <td>
        <a href={`https://github.com/${user}/${repository}`} target="_blank" rel="noreferrer">
          {repository}
        </a>
      </td>
      <td>
        <a href={rawUrl} target="_blank" rel="noreferrer">
          {deployment}
        </a>
      </td>
    </tr>
  );
};

TableEntry.propTypes = {
  score: PropTypes.number.isRequired,
  user: PropTypes.string.isRequired,
  repository: PropTypes.string.isRequired,
  deployment: PropTypes.string.isRequired,
  rawUrl: PropTypes.string.isRequired,
};

class ResultTable extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { queryResult } = this.props;
    return (
      <table className="table table is-hoverable table is-fullwidth">
        <thead>
          <tr>
            <th>Score</th>
            <th>User</th>
            <th>Repository</th>
            <th>Deployment</th>
          </tr>
        </thead>
        <tbody>
          {queryResult.map((e) => (
            <TableEntry
              key={e.repository.id}
              score={e.deployment.score}
              user={e.user.name}
              repository={e.repository.name}
              deployment={e.deployment.name}
              rawUrl={e.deployment.rawUrl}
            />
          ))}
        </tbody>
      </table>
    );
  }
}

ResultTable.propTypes = {
  queryResult: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default ResultTable;
