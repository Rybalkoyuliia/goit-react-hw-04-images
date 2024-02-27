import React from 'react';
import s from './Button.module.css';

const Button = ({ loadMore, loading }) => {
  return (
    <button className={s.Button} onClick={loadMore}>
      {loading ? 'Loading...' : 'Load more'}
    </button>
  );
};

export default Button;
