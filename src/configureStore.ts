import { Store, createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension'
import { ApplicationState, rootReducer, rootSaga } from './store'

export default function configureStore(
): Store<ApplicationState> {
  const composeEnhancers = composeWithDevTools({})
  const sagaMiddleware = createSagaMiddleware()

  const store = createStore(rootReducer,
    composeEnhancers(applyMiddleware(sagaMiddleware))
    );
  
  sagaMiddleware.run(rootSaga)
  return store
}