import { firebase } from "../../Axios";
const FETCH_TAKEAWAYS_START = "FETCH_TAKEAWAYS_START";
const FETCH_TAKEAWAYS_SUCCESS = "FETCH_TAKEAWAYS_SUCCESS";
const FETCH_TAKEAWAYS_FAIL = "FETCH_TAKEAWAYS_FAIL";

export const fetchTakeaways = (bookKey, chapterKey) => {
  return async (dispatch) => {
    dispatch(fetchTakeawaysStart());
    try {
      const takeawaysData = await firebase.get(
        `booksData/${bookKey}/chapters/${chapterKey}.json`
      );
      dispatch(fetchTakeawaysSuccess(takeawaysData.data))
    } catch (error) {
      console.log(error);
      dispatch(fetchTakeawaysFail(error))
    }
  };
};

export const fetchTakeawaysStart = () => {
  return {
    type: FETCH_TAKEAWAYS_START,
  };
};

export const fetchTakeawaysSuccess = takeawaysData => {
  return {
    type: FETCH_TAKEAWAYS_SUCCESS,
    takeawaysData: takeawaysData,
  };
};

export const fetchTakeawaysFail = (error) => {
  return {
    type: FETCH_TAKEAWAYS_FAIL,
    error: error,
  };
};

export { FETCH_TAKEAWAYS_START, FETCH_TAKEAWAYS_SUCCESS, FETCH_TAKEAWAYS_FAIL };
