import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";

import { AdminReducer, loginGoogleReducer } from "./Admin/admin.reducers";
import { persistReducer, persistStore } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
  admin: { success: false },
};

const rootPersistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const reducer = combineReducers({
  admin: AdminReducer,
  login: loginGoogleReducer,
});
// to show redux store in chrome developer tools is to update compose function
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const persistedReducer = persistReducer(rootPersistConfig, reducer);

export const store = createStore(
  persistedReducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export const persistor = persistStore(store);
