import { googleBooks, firebase } from "../../Axios";
const FETCH_BOOK_DATA_START = "FETCH_BOOK_DATA_START";
const GET_SAVED_BOOKS_IDS = "GET_SAVED_BOKS_IDS";
const ADD_BOOK = "ADD_BOOK";
const FETCH_SINGLE_BOOK = "FETCH_SINGLE_BOOK";
const FETCH_BOOK_DATA_SUCCESS = "FETCH_BOOK_DATA_SUCCESS";
const FETCH_BOOK_DATA_FAIL = "FETCH_BOOK_DATA_FAIL";
const FETCH_SAVED_BOOKS_START = "FETCH_SAVED_BOOKS_START";
const FETCH_SAVED_BOOKS_SUCCESS = "FETCH_SAVED_BOOKS_SUCCESS";
const FETCH_SAVED_BOOKS_FAIL = "FETCH_SAVED_BOOKS_FAIL";

export const fetchBookData = inputText => {
  if (inputText.trim() === "") {
    return;
  }
  return async (dispatch) => {
    dispatch(fetchBookDataStart());
    try {
      await dispatch(getSavedBooksId());
      const myData = await googleBooks.get(`?q=${inputText}`);
      dispatch(fetchBookDataSuccess(myData.data));
    } catch (error) {
      console.log(error);
      dispatch(fetchBookDataFail(error));
    }
  };
};

export const fetchBookDataStart = () => {
  return {
    type: FETCH_BOOK_DATA_START,
  };
};

export const fetchBookDataSuccess = (booksData) => {
  return {
    type: FETCH_BOOK_DATA_SUCCESS,
    booksData: booksData,
  };
};

export const fetchBookDataFail = (error) => {
  return {
    type: FETCH_BOOK_DATA_FAIL,
    error: error,
  };
};

export const getSavedBooksId = () => {
  return async (dispatch) => {
    try {
      const response = await firebase.get("booksData.json");
      const data = response.data;
      // console.log('Data dal merda di firebase', data);
      const allIds = [];
      for (let key in data) {
        allIds.push(data[key].bookId);
      }
      dispatch({ type: GET_SAVED_BOOKS_IDS, savedIds: allIds });
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchSavedBooks = () => {
    return async (dispatch) => {
        dispatch(fetchSavedBooksStart());
        try {
            const response = await firebase.get('booksData.json');
            const bookList = [];
            for (let key in response.data) {
                //Aggiungo un oggetto contenente titolo e Id nell'array da iterare
                bookList.push({
                    title: response.data[key].bookTitle,
                    id: response.data[key].bookId,
                    key: key,
                })
            }
            dispatch(fetchSavedBooksSuccess(bookList))
        } catch (error) {
            console.log(error);
            dispatch(fetchSavedBooksFail(error))
        }
    };
  };
  
  export const fetchSavedBooksStart = () => {
    return {
      type: FETCH_SAVED_BOOKS_START,
    };
  };
  
  export const fetchSavedBooksSuccess = (savedBooks) => {
    return {
      type: FETCH_SAVED_BOOKS_SUCCESS,
      savedBooks: savedBooks,
    };
  };
  
  export const fetchSavedBooksFail = (error) => {
    return {
      type: FETCH_SAVED_BOOKS_FAIL,
      error: error,
    };
  };

export const addNewBook = (id, title, key) => {
  return async (dispatch) => {
    try {
      const data = await firebase.post("booksData.json", {
        bookId: id,
        bookTitle: title,
        bookKey: key,
      });
      await dispatch(getSavedBooksId());
      console.log(data);
      //   setLoading(false);
      //   setError(false);
    } catch (error) {
      console.log(error);
      //   setLoading(false);
      //   setError(true);
    }
  };
};

export {
  FETCH_BOOK_DATA_START,
  FETCH_BOOK_DATA_SUCCESS,
  FETCH_BOOK_DATA_FAIL,
  GET_SAVED_BOOKS_IDS,
  ADD_BOOK,
  FETCH_SINGLE_BOOK,
  FETCH_SAVED_BOOKS_START,
  FETCH_SAVED_BOOKS_SUCCESS,
  FETCH_SAVED_BOOKS_FAIL
};
