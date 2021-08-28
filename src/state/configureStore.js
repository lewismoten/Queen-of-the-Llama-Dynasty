import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();

const configureStore = (initialState = {}) => {
  const applied = applyMiddleware(sagaMiddleware);
  const composed = composeWithDevTools({})(applied);

  const store = createStore(
    rootReducer,
    initialState,
    composed
  );
  store.runSaga = sagaMiddleware.run;
  store.asyncReducers = {};
  if(module.hot) {
    module.hot.accept('./rootReducer', () => {
        const newRootReducer = require('./rootReducer').default;
        store.replaceReducer(newRootReducer)
    });
  }
  sagaMiddleware.run(rootSaga)
  return store;
}

export default configureStore;
