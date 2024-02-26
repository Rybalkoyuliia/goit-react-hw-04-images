import React from 'react';
import s from './ImageGallery.module.css';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

const ImageGallery = ({ hits, openModal }) => {
  return (
    <ul className={s.ImageGallery}>
      {hits.map(hit => (
        <ImageGalleryItem key={hit.id} {...hit} openModal={openModal} />
      ))}
    </ul>
  );
};

export default ImageGallery;
