import { combineReducers } from 'redux';

import reducer from '../pages/reducer';

const rootReducer = combineReducers({ 
  app: reducer,
})

export default rootReducer;