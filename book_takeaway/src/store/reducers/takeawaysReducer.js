import * as actionTypes from "../actions/handleBookTakeaways";

const initialState = { 
    takeawaysList: [],
    loading: false,
    error: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
      case actionTypes.FETCH_TAKEAWAYS_START:
          return {
              ...state,
              loading: true,
              error: false,
          }
          case actionTypes.FETCH_TAKEAWAYS_SUCCESS:
          return {
              ...state,
              takeawaysList: action.takeawaysData,
              loading: false,
              error: false,
          }
          case actionTypes.FETCH_TAKEAWAYS_FAIL:
          return {
              ...state,
              loading: true,
              error: action.error,
          }
    default:
      return state;
  }
};

export default reducer;
