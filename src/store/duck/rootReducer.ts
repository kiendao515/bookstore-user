import { combineReducers } from '@reduxjs/toolkit';

import auth from './auth/slice';
import konva from './konva/slice';
import cart from './cart/slice';
import togglePopUp from './togglePopUp/slice';
import webContent from './webContent/slice';
import bookFavorite from './bookFavorite/slice'

const createRootReducer = () => {
  return combineReducers({
    auth,
    konva,
    togglePopUp,
    cart,
    bookFavorite,
    webContent
  });
};

export default createRootReducer;
