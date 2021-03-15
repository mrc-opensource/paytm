import actionTypes from './actionTypes';

export const setTestAction = (dispatch) => testData => {
    return dispatch({
        type: actionTypes.TEST_ACTION,
        testData
    });
}