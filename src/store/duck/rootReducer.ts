import { combineReducers } from '@reduxjs/toolkit';

import auth from './auth/slice';
import konva from './konva/slice';

const createRootReducer = () => {
  return combineReducers({
    auth,
    konva,
  });
};

export default createRootReducer;
