import { createStore, applyMiddleware } from 'redux';
import { createTransform, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware, { END } from 'redux-saga';
import crypto from '../services/crypto';
import rootReducer, { rootPersist, authenPersist } from './root.reducer';
import rootSaga from './root.saga';


const sagaMiddleware = createSagaMiddleware();

function bindMiddleware(middleware:any) {
  if (process.env.NODE_ENV !== "production") {
    const { composeWithDevTools } = require("redux-devtools-extension")
    return composeWithDevTools(applyMiddleware(...middleware))
  }

  return applyMiddleware(...middleware)
}


const configureStore = (preloadedState = {}) => {

  const cryptoTransform = createTransform(
    (ibs) => {
      return ibs ? crypto.encrypt(JSON.stringify(ibs)) : ibs;
    },
    (obs) => {
      return obs ? JSON.parse(crypto.decrypt(`${obs}`)) : obs;
    },
    { whitelist: authenPersist },
  );

  const rootPersistConfig = {
    key: 'root',
    storage: storage,
    whitelist: rootPersist,
    transforms: [cryptoTransform],
  };
  
  const store:any = createStore(
    persistReducer(rootPersistConfig,rootReducer),
    preloadedState,
    bindMiddleware([sagaMiddleware])
  )

  store.runSaga = () => {
    if (store.saga) return
    store.saga = sagaMiddleware.run(rootSaga)
  }

  store.stopSaga = async () => {
    if (!store.saga) return
    store.dispatch(END)
    await store.saga.done
    store.saga = null
  }

  store.execSagaTasks = async (isServer:any, tasks:any) => {
    store.runSaga()
    tasks(store.dispatch)
    await store.stopSaga()
    if (!isServer) {
      store.runSaga()
    }
  }

  store.runSaga()

  return store
}
export default configureStore