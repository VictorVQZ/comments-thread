import axios from '../axios';

export const FETCH_DATA = 'FETCH_DATA';
export const ADD_COMMENT = 'ADD_COMMENT';

export const getData = () => {
    return dispatch => {
    	axios.get( '/comments' )
            .then( response => {
                const comments = response.data;
                dispatch({
			        type: FETCH_DATA,
			        comments: comments
			    });
            });
    }
};

export const addComment = (newComment) => {
    return dispatch => {
    	axios.post('/comments', newComment)
			.then(response => {
                const comment = response.data;                

                dispatch({
			        type: ADD_COMMENT,
			        comment: comment
			    });
            });
    }
};