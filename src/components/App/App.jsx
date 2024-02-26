import React from 'react';

// import Button from '../Button/Button';
import ImageGallery from '../ImageGallery/ImageGallery';
import Searchbar from '../Searchbar/Searchbar';
import s from './App.module.css';
import { fetchImages } from 'servises/api';
import Loader from 'components/Loader/Loader';
import Unsuccess from 'components/Unsuccess/Unsuccess';
import Button from 'components/Button/Button';
import Modal from 'components/Modal/Modal';

export class App extends React.Component {
  state = {
    hits: [],
    totalHits: 0,
    page: 1,
    loading: false,
    error: null,
    q: '',
    isOpen: false,
    largeImageURL: '',
  };

  async componentDidMount() {
    try {
      this.setState({ loading: true });
      const { hits, totalHits } = await fetchImages();
      this.setState({ hits: hits, totalHits: totalHits });
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ loading: false });
    }
  }

  async componentDidUpdate(prevProp, prevState) {
    if (prevState.q !== this.state.q || prevState.page !== this.state.page) {
      try {
        this.setState({ loading: true, error: null });
        const { hits, totalHits } = this.state.q
          ? await fetchImages({
              page: this.state.page,
              q: this.state.q,
            })
          : await fetchImages({
              page: this.state.page,
            });
        this.setState(prev => ({
          hits: [...prev.hits, ...hits],
          totalHits: totalHits,
        }));
      } catch (error) {
      } finally {
        this.setState({ loading: false });
      }
    }
  }

  handleToggleModal = () => {
    this.setState(prev => ({ isOpen: !prev.isOpen }));
  };

  handleImg = largeImageURL => {
    this.setState({ isOpen: true, largeImageURL });
  };

  handleSetQuery = query => {
    this.setState({ q: query, hits: [], page: 1 });
  };

  handleLoadMore = () => {
    this.setState(prev => ({ page: prev.page + 1 }));
  };

  render() {
    const { hits, loading, totalHits, q, isOpen, largeImageURL } = this.state;
    return (
      <div className={s.App}>
        <Searchbar handleSetQuery={this.handleSetQuery} />
        {!hits.length && !loading ? (
          <Unsuccess seachWord={q} />
        ) : (
          <ImageGallery openModal={this.handleImg} hits={hits} />
        )}
        {loading && !hits.length && <Loader />}
        {hits.length && hits.length < totalHits ? (
          <Button loadMore={this.handleLoadMore} loading={loading} />
        ) : null}
        {isOpen && (
          <Modal src={largeImageURL} closeModal={this.handleToggleModal} />
        )}
      </div>
    );
  }
}
