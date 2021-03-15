import { createStore } from 'redux';
import actionTypes from './actions/actionTypes';
import { EMPTY_RECEIPT } from './constants';
const DEFAULT_STATE = {
  receipts: [EMPTY_RECEIPT()],
  exchangeRates: {},
  retrievalTime: null
}
function rootReducer(state, action) {
    switch (action.type) {
      case actionTypes.ADD_RECEIPT:
        return {
          ...state,
          receipts: state.receipts.concat(action.receipt)
        }
      case actionTypes.SET_RECEIPT:
        var tempReceipts = [...state.receipts];
        /*
        tempReceipts[action.receiptId] = {
          ...tempReceipts[action.receiptId],
          action.receipt
        };*/
        const keys = Object.keys(action.receipt);
        for (var i = 0; i < keys.length; i++) {
          tempReceipts[action.receiptId][keys[i]] = action.receipt[keys[i]];
        }
        return {
            ...state,
            receipts: tempReceipts
        }
      case actionTypes.TEST_ACTION:
        return {
            ...state,
            testData: action.testData
        }
      default:
        return state
    }
  }
  
export default createStore(rootReducer, DEFAULT_STATE);