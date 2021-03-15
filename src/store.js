import { createStore } from 'redux';
import actionTypes from './actions/actionTypes';

function rootReducer(state = {}, action) {
    switch (action.type) {
      case actionTypes.TEST_ACTION:
        return {
            ...state,
            testData: action.testData
        }
      default:
        return state
    }
  }
  
export default createStore(rootReducer, {});