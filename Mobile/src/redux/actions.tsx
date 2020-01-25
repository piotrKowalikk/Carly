import {
  SAVE_TOKEN
} from './constants';

export const saveToken = (token: string) => {
  return {
    type: SAVE_TOKEN,
    payload: {
      token
    }
  }
}