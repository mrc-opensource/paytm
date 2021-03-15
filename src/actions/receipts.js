import actionTypes from './actionTypes';
import { EMPTY_RECEIPT } from '../constants';

export const setReceipt = (dispatch, receiptId) => (receipt) => {
    return dispatch({
        type: actionTypes.SET_RECEIPT,
        receipt,
        receiptId
    });
}

export const addReceipt = (dispatch) => () => {
    return dispatch({
        type: actionTypes.ADD_RECEIPT,
        receipt: EMPTY_RECEIPT()
    });
}