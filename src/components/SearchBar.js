import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { postFetcher } from '../helper';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      option: 'docker-compose',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  async handleClick(e) {
    e.preventDefault();
    const { input, option } = this.state;
    const { updateQuery } = this.props;

    const data = await postFetcher('/api/v1/query', { images: input, type: option });

    updateQuery(data);
  }

  render() {
    const { input } = this.state;
    return (
      <div className="columns is-centered">
        <div className="column is-four-fifths" />
        <div className="column is-four-fifths">
          <div className="field has-addons ">
            <div className="control is-expanded">
              <input
                className="input is-rounded"
                type="text"
                name="input"
                value={input}
                onChange={this.handleChange}
                placeholder="Search for images"
              />
            </div>
            <div className="select">
              <select name="option" onChange={this.handleChange}>
                <option>docker-compose</option>
              </select>
            </div>
            <div className="control">
              <button className="button" type="submit" onClick={this.handleClick}>
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="column is-four-fifths" />
      </div>
    );
  }
}

SearchBar.defaultProps = {
  updateQuery: {},
};

SearchBar.propTypes = {
  updateQuery: PropTypes.func,
};

export default SearchBar;
