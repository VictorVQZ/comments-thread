import axios from '../axios';

export const FETCH_DATA = 'FETCH_DATA';
export const ADD_COMMENT = 'ADD_COMMENT';

export const getData = ( res ) => {
    return dispatch => {
    	axios.get( '/comments' )
            .then( response => {
                const comments = response.data;
                dispatch(saveData(comments))
            });
    }
};

export const saveData = ( res ) => {
    return {
        type: FETCH_DATA,
        comments: res
    };
};