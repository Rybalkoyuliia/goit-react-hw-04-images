import React, { useCallback, useEffect } from 'react';
import s from './Modal.module.css';

const Modal = props => {
  const handleKeyDown = useCallback(
    e => {
      if (e.key === 'Escape') {
        props.closeModal();
      }
    },
    [props]
  );

  useEffect(() => {
    document.body.style.overflowY = 'hidden';
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflowY = 'auto';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      props.closeModal();
    }
  };

  return (
    <div className={s.overlay} onClick={handleBackdropClick}>
      <div className={s.modal}>
        <img src={props.src.largeImageURL} alt="" />
      </div>
    </div>
  );
};

export default Modal;
