import {GET_ACCESS_TOKEN} from './actionType';

const getAccessToken = (token: string) => (dispatch: any) => {
  return dispatch({type: GET_ACCESS_TOKEN, payload: token});
};

export {getAccessToken};
