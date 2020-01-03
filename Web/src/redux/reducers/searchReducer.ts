export const initialState = {
    error: null,
}

export const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ActionType.SEARCH_TYPE_CHANGE': {
            const { searchType } = action.payload;
            return Object.assign({}, state, { searchType })
        }
        default:
            return state;
    }
}