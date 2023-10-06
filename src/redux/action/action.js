import axios from 'axios';
import {FETCH_NEWS_SUCCESS, FETCH_NEWS_FAILURE} from '../constants/constants';
export const fetchNews = () => {
  return async dispatch => {
    try {
      const response = await axios.get(
        'https://newsdata.io/api/1/news?apikey=pub_299706fc754d2787e5d5e28874e6f6f377ecd&q=news%20api',
      );
      dispatch({
        type: FETCH_NEWS_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: FETCH_NEWS_FAILURE,
        payload: error,
      });
    }
  };
};
