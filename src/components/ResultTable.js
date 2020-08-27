/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

const TableEntry = (props) => {
  const {
    score,
    user,
    repository,
    deployment,
    rawUrl,
    deploymentId,
    selectRow,
    selectedRow,
  } = props;
  return (
    <tr
      className={selectedRow === deploymentId ? 'is-selected' : ''}
      data-key={deploymentId}
      onClick={selectRow}
    >
      <td data-key={deploymentId}>{score}</td>
      <td data-key={deploymentId}>
        <a href={`https://github.com/${user}`} target="_blank" rel="noreferrer">
          {user}
        </a>
      </td>
      <td data-key={deploymentId}>
        <a href={`https://github.com/${user}/${repository}`} target="_blank" rel="noreferrer">
          {repository}
        </a>
      </td>
      <td data-key={deploymentId}>
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
  deploymentId: PropTypes.string.isRequired,
  selectRow: PropTypes.func.isRequired,
  selectedRow: PropTypes.string.isRequired,
};

class ResultTable extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { queryResult, selectedRow, selectRow } = this.props;
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
              deploymentId={e.deployment.id}
              selectRow={selectRow}
              selectedRow={selectedRow}
            />
          ))}
        </tbody>
      </table>
    );
  }
}

ResultTable.propTypes = {
  queryResult: PropTypes.arrayOf(PropTypes.any).isRequired,
  selectedRow: PropTypes.string.isRequired,
  selectRow: PropTypes.func.isRequired,
};

export default ResultTable;
