import React, { Component } from 'react';
import s from './Searchbar.module.css';

export default class Searchbar extends Component {
  state = {
    seachValue: '',
  };

  handleChangeValue = e => {
    this.setState({ seachValue: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.handleSetQuery(this.state.seachValue);
    this.setState({ seachValue: '' });
  };

  render() {
    return (
      <header className={s.Searchbar}>
        <form className={s.SearchForm} onSubmit={this.handleSubmit}>
          <button className={s.SearchForm_button} type="submit">
            <span className={s.SearchForm_button_label}>Search</span>
          </button>
          <input
            type="text"
            name="searchForm"
            value={this.state.seachValue}
            className={s.SearchForm_input}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleChangeValue}
          />
        </form>
      </header>
    );
  }
}
