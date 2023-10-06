const initialState = {
  news: [],
  loading: false,
  error: null,
};

const newsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_NEWS_SUCCESS':
      return {
        ...state,
        news: action.payload,
        loading: false,
        error: null,
      };
    case 'FETCH_NEWS_FAILURE':
      return {
        ...state,
        news: [],
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default newsReducer;
