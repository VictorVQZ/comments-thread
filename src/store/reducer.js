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
            return {
                ...state,
                comments: state.comments.concat( action.comment )
            };
        default:
            return state;
    }
};

export default reducer;