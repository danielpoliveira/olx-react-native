import React from 'react'; 
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux'

import reducers from './src/main/reducers';

import promise from 'redux-promise';
import multi from 'redux-multi';
import thunk from 'redux-thunk';

import App from './src';

import { DropDownComponentProvider } from './src/contexts';

import { StatusBar } from 'react-native';

const store = applyMiddleware(thunk, multi, promise)(createStore)(reducers);

export default () => 
<Provider store={store} >
  <DropDownComponentProvider 
    inactiveStatusBarStyle="light-content"
    updateStatusBar={false}
    translucent={true}
  >
    <App />
  </DropDownComponentProvider>
</Provider>
