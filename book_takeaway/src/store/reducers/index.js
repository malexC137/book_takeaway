import { combineReducers } from 'redux';
import bookReducer from './bookReducer';
import chapterReducer from './chapterReducer';
import takeawaysReducer from './takeawaysReducer';

const rootReducer = combineReducers({
    bookReducer: bookReducer,
    takeawaysReducer: takeawaysReducer,
    chapterReducer: chapterReducer,
})

export default rootReducer;