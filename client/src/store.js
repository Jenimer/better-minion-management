import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';
import axios from 'axios';
import apiMiddleWare from 'redux-devise-axios';

const options = { axios }

const enhancers = compose(
  applyMiddleware(thunk, apiMiddleWare(options)),
  window.devToolsExtension ? window.devToolsExtension() : f => f
);

const store = createStore(rootReducer, {}, enhancers);

if(module.hot){
  module.hot.accept('./reducers/',() => {
    const nextRootReducer = require('./reducers/index').default;
    store.replaceReducer(nextRootReducer);
  });
}

export default store;