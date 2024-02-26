import React from 'react';
import s from './Unsuccess.module.css';

const Unsuccess = ({ seachWord }) => {
  return (
    <div className={s.container}>
      <p className={s.paragraph}>
        No images were found for your request <span>"{seachWord}"</span>{' '}
      </p>
      <p className={s.paragraph}>
        Please
        <span className={s.accent}> check the input for typos</span>, or try to
        enter a<span className={s.accent}> synonym</span> of the search word in
        the search field.
      </p>
      <p className={s.paragraph}>Thank you for using our service!</p>
    </div>
  );
};

export default Unsuccess;
