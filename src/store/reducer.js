import * as actionTypes from './actions';


const initialState = {
    comments: []
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.FETCH_DATA:
            return {
                ...state,
                comments: action.comments
            };
        case actionTypes.ADD_COMMENT:
            // Prevent duplicated ids due to storage not persistent
            const comment = action.comment;
            if(state.comments.some(e => e.id === comment.id)){
                comment.id = new Date().getTime();
            }
            return {
                ...state,
                comments: state.comments.concat( comment )
            };
        default:
            return state;
    }
};

export default reducer;