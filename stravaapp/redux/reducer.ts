import {GET_ACCESS_TOKEN} from './actionType';

const initialState = {
  accessToken: '',
};

export const reducer = (state = initialState, {type, payload}: any) => {
  switch (type) {
    case GET_ACCESS_TOKEN: {
      return {...state, accessToken: payload};
    }
    default:
      return state;
  }
};
