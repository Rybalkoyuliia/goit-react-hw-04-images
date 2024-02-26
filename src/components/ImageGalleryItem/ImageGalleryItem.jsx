import React from 'react';
import s from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ webformatURL, openModal, largeImageURL }) => {
  return (
    <li className={s.ImageGalleryItem}>
      <img
        className={s.ImageGalleryItem_image}
        src={webformatURL}
        alt=""
        onClick={() => openModal({ largeImageURL })}
      />
    </li>
  );
};

export default ImageGalleryItem;
