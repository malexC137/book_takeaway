import { firebase } from "../../Axios";
const FETCH_BOOK_CHAPTERS = "FETCH_BOOK_CHAPTERS";
const CREATE_NEW_TAKEAWAYS = "CREATE_NEW_TAKEAWAYS";
const FETCH_CHAPTERS_DATA_START = "ETCH_CHAPTERS_DATA_START";
const FETCH_CHAPTERS_DATA_SUCCESS = "ETCH_CHAPTERS_DATA_SUCCESS";
const FETCH_CHAPTERS_DATA_FAIL = "ETCH_CHAPTERS_DATA_FAIL";
const CREATE_NEW_CHAPTER_START = "CREATE_NEW_CHAPTER_START";
const CREATE_NEW_CHAPTER_SUCCESS = "CREATE_NEW_CHAPTER_SUCCESS";
const CREATE_NEW_CHAPTER_FAIL = "CREATE_NEW_CHAPTER_FAIL";

export const fetchChaptersData = (bookKey) => {
  return async (dispatch) => {
    dispatch(fetchChaptersDataStart());
    try {
      const response = await firebase.get(`booksData/${bookKey}/chapters.json`);
      const myData = await response.data;
      const chaptersList = [];
      for (let key in myData) {
        chaptersList.push(key);
      }
      dispatch(fetchChaptersDataSuccess(chaptersList));
    } catch (error) {
      console.log(error);
      fetchChaptersDataFail(error);
    }
  };
};

export const fetchChaptersDataStart = () => {
  return {
    type: FETCH_CHAPTERS_DATA_START,
  };
};

export const fetchChaptersDataSuccess = (chaptersList) => {
  return {
    type: FETCH_CHAPTERS_DATA_SUCCESS,
    chaptersList: chaptersList,
  };
};

export const fetchChaptersDataFail = (error) => {
  return {
    type: FETCH_CHAPTERS_DATA_FAIL,
    error: error,
  };
};

export const createNewChapter = (bookKey, inputText) => {
  return async dispatch => {
    dispatch(createNewChapterStart());
    try {
      const response = await firebase.post(
        `booksData/${bookKey}/chapters.json`,
        [inputText]
      );
      dispatch(createNewChapterSuccess(response.data.name));
    } catch (error) {
      dispatch(createNewChapterFail(error));
      console.log(error);
    }
  };
};

export const createNewChapterStart = () => {
  return {
    type: CREATE_NEW_CHAPTER_START,
  };
};

export const createNewChapterSuccess = newChapter => {
  return {
    type: CREATE_NEW_CHAPTER_SUCCESS,
    newChapter: newChapter,
  };
};

export const createNewChapterFail = (error) => {
  return {
    type: CREATE_NEW_CHAPTER_FAIL,
    error: error,
  };
};

export {
  FETCH_BOOK_CHAPTERS,
  CREATE_NEW_TAKEAWAYS,
  FETCH_CHAPTERS_DATA_START,
  FETCH_CHAPTERS_DATA_SUCCESS,
  FETCH_CHAPTERS_DATA_FAIL,
  CREATE_NEW_CHAPTER_START,
  CREATE_NEW_CHAPTER_SUCCESS,
  CREATE_NEW_CHAPTER_FAIL,
};
