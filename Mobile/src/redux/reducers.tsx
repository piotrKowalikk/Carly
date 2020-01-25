import {
  SAVE_TOKEN
} from './constants';

export const initialState = {
  token: null
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_TOKEN: {
      const { token } = action.payload;
      return Object.assign({}, state, { token: token });
    }
    default:
      return state;
  }
}

export default appReducer;