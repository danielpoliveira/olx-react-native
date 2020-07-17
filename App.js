
import React from 'react'; 
import { Provider } from 'react-redux';
import { createStore } from 'redux'
import reducers from './src/main/reducers';

import App from './src';

const store = createStore(reducers);

export default () => 
<Provider store={store} >
  <App />
</Provider>
