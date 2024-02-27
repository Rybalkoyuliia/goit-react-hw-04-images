export const initialState = {
  hits: [],
  totalHits: 0,
  page: 1,
  loading: false,
  error: null,
  q: '',
  isOpen: false,
  largeImageURL: '',
};

export const ImgReducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case 'fetchData':
      return {
        ...state,
        hits: [...state.hits, ...action.payload.hits],
        totalHits: action.payload.totalHits,
      };
    case 'loading':
      return {
        ...state,
        loading: action.payload,
      };
    case 'error':
      return {
        ...state,
        error: action.payload,
      };
    case 'loadMore':
      return {
        ...state,
        page: state.page + 1,
      };
    case 'toggleModal':
      return {
        ...state,
        isOpen: !state.isOpen,
      };
    case 'setQuery':
      return {
        ...state,
        q: action.payload,
        hits: [],
        page: 1,
      };
    case 'getImg':
      return {
        ...state,
        isOpen: true,
        largeImageURL: action.payload,
      };

    default:
      return state;
  }
};
