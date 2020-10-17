// redux 세팅
import { createWrapper } from "next-redux-wrapper";
import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";

import reducer from "../reducers";
import rootSaga from "../sagas";

// state와 reducer를 포함하는 것이 바로 store이다.
const configureStore = (context) => {
    console.log(context);

    const sagaMiddleware = createSagaMiddleware();
    const middlewares = [sagaMiddleware];

    // redux 개발 도구와 연동하기 위한 enhancer. 배포용일 경우에는 개발 도구와 연동하지 않도록 한다.
    const enhancer = process.env.NODE_ENV === "production" ? compose(applyMiddleware(...middlewares)) : composeWithDevTools(applyMiddleware(...middlewares));

    const store = createStore(reducer, enhancer);
    store.sagaTask = sagaMiddleware.run(rootSaga);

    return store;
};

// debug가 true이면 개발 모드
const wrapper = createWrapper(configureStore, { debug: process.env.NODE_ENV === "development" });

export default wrapper;
