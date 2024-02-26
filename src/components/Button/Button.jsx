import React from 'react';
import s from './Button.module.css';

const Button = props => {
  return (
    <button className={s.Button} onClick={props.loadMore}>
      {props.loading ? 'Loading...' : 'Load more'}
    </button>
  );
};

export default Button;
