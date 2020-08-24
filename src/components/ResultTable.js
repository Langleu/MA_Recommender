/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';

const TableEntry = (props) => {
  const { score, user, repository, deployment } = props;
  return (
    <tr>
      <td>{score}</td>
      <td>{user}</td>
      <td>{repository}</td>
      <td>{deployment}</td>
    </tr>
  );
}

class ResultTable extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const example = [
      { user: "A",
        score: Math.round(Math.random() * 100),
        repository: 'something',
        deployment: 'docker-compose.yml'
      },
      { user: "B",
        score: Math.round(Math.random() * 100),
        repository: 'something',
        deployment: 'docker-compose.yml'
      },
      { user: "C",
        score: Math.round(Math.random() * 100),
        repository: 'something',
        deployment: 'docker-compose.yml'
      },
      { user: "D",
        score: Math.round(Math.random() * 100),
        repository: 'something',
        deployment: 'docker-compose.yml'
      },
      { user: "E",
        score: Math.round(Math.random() * 100),
        repository: 'something',
        deployment: 'docker-compose.yml'
      },
      { user: "F",
        score: Math.round(Math.random() * 100),
        repository: 'something',
        deployment: 'docker-compose.yml'
      }
    ]
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
          {example.map((e) => (
            <TableEntry key={e.user} score={e.score} user={e.user} repository={e.repository} deployment={e.deployment} />
          ))}
        </tbody>
      </table>
    );
  }
}

export default ResultTable;
