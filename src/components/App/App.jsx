import React, { useCallback, useEffect, useReducer } from 'react';

import ImageGallery from '../ImageGallery/ImageGallery';
import Searchbar from '../Searchbar/Searchbar';
import s from './App.module.css';
import { fetchImages } from 'servises/api';
import Loader from 'components/Loader/Loader';
import Unsuccess from 'components/Unsuccess/Unsuccess';
import Button from 'components/Button/Button';
import Modal from 'components/Modal/Modal';
import { ImgReducer, initialState } from 'components/Hooks/ImgReducer';

export const App = () => {
  const [state, dispatch] = useReducer(ImgReducer, initialState);
  const { hits, totalHits, page, loading, q, isOpen, largeImageURL } = state;

  const getData = useCallback(async () => {
    try {
      dispatch({ type: 'loading', payload: true });
      dispatch({ type: 'error', payload: null });
      const { hits, totalHits } = q
        ? await fetchImages({ page: page, q: q })
        : await fetchImages({ page: page });
      dispatch({ type: 'fetchData', payload: { hits, totalHits } });
    } catch (error) {
      dispatch({ type: 'error', payload: error });
    } finally {
      dispatch({ type: 'loading', payload: false });
    }
  }, [page, q]);

  useEffect(() => {
    getData();
  }, [getData]);

  const handleToggleModal = () => {
    dispatch({ type: 'toggleModal' });
  };

  const handleImg = largeImageURL => {
    dispatch({ type: 'getImg', payload: largeImageURL });
  };

  const handleSetQuery = q => {
    dispatch({ type: 'setQuery', payload: q });
  };

  const handleLoadMore = () => {
    dispatch({ type: 'loadMore' });
  };

  return (
    <div className={s.App}>
      <Searchbar handleSetQuery={handleSetQuery} />
      {!hits.length && !loading ? (
        <Unsuccess seachWord={q} />
      ) : (
        <ImageGallery openModal={handleImg} hits={hits} />
      )}
      {loading && !hits.length && <Loader />}

      {hits.length && hits.length < totalHits ? (
        <Button loadMore={handleLoadMore} loading={loading} />
      ) : null}

      {isOpen && <Modal src={largeImageURL} closeModal={handleToggleModal} />}
    </div>
  );
};
