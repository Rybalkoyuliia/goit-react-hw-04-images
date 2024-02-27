import React, { useState } from 'react';
import s from './Searchbar.module.css';

const Searchbar = props => {
  const [searchValue, setSearchValue] = useState('');

  const handleChangeValue = e => {
    setSearchValue(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    props.handleSetQuery(searchValue);
    setSearchValue('');
  };

  return (
    <header className={s.Searchbar}>
      <form className={s.SearchForm} onSubmit={handleSubmit}>
        <button className={s.SearchForm_button} type="submit">
          <span className={s.SearchForm_button_label}>Search</span>
        </button>
        <input
          type="text"
          name="searchForm"
          value={searchValue}
          className={s.SearchForm_input}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChangeValue}
        />
      </form>
    </header>
  );
};

export default Searchbar;
