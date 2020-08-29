import { all, fork, call, put, takeLatest, delay } from "redux-saga/effects";
import axios from "axios";

import { LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_IN_FAILURE, LOG_OUT_REQUEST, LOG_OUT_SUCCESS, LOG_OUT_FAILURE, SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAILURE } from "../reducers/user";

// 서버에 데이터를 요청하는 함수. 얘는 제네레이터 아님!
function logInAPI(data) {
    return axios.post("/api/login", data);
}

// LOG_IN_REQUEST 액션 함수(리듀서 안의 loginRequestAction)에 담긴 데이터가 자동으로 logIn 함수의 매개변수로 전달 됨.
function* logIn(action) {
    // 요청이 성공했을 경우 try 실행, 실패했을 경우 catch 실행
    try {
        // call: 비동기 함수를 실행하는 이펙트. 여기서는 logInAPI가 데이터를 받아올 때까지 기다림
        // call의 두 번째 인자인 action.data가 logInAPI의 인자로 들어간다.
        // const result = yield call(logInAPI, action.data);
        yield delay(2000);
        console.log("saga login request");
        // put: dispatch와 같은 기능을 하는 이펙트
        yield put({
            type: LOG_IN_SUCCESS,
            data: action.data,
        });
    } catch (err) {
        yield put({ type: LOG_IN_FAILURE, error: err.response.data });
    }
}

// 로그아웃도 비슷한 패턴으로 제작하여 사용
function logOutAPI() {
    return axios.post("/api/logout");
}

function* logOut() {
    try {
        // const result = yield call(logOutAPI);
        yield delay(2000);
        console.log("saga logout request");
        yield put({
            type: LOG_OUT_SUCCESS,
            // data: result.data
        });
    } catch (err) {
        yield put({ type: LOG_OUT_FAILURE, error: err.response.data });
    }
}

function signUpAPI() {
    return axios.post("/api/signup");
}

function* signUp() {
    try {
        // const result = yield call(signUpAPI);
        yield delay(2000);
        console.log("saga signup request");
        yield put({
            type: SIGN_UP_SUCCESS,
            // data: result.data
        });
    } catch (err) {
        yield put({ type: SIGN_UP_FAILURE, error: err.response.data });
    }
}

// eventlistener와 같은 역할을 하는 함수. 로그인 요청 액션을 감지한다.
function* watchLogIn() {
    // take: 해당 액션이 실행될 때 까지 기다렸다가, 두 번째 인자의 함수를 실행한다. (take는 1회용, takeEvery는 계속 사용)
    // takeLatest: 마우스로 광클해서 요청을 무지하게 보내도 마지막 요청에만 응답하게끔 해줌. (하지만 무수한 요청은 막을 수 없음)
    // throttle: 마우스로 광클해도 일정 시간동안 한번의 요청만 보낼 수 있게 해줌.
    yield takeLatest(LOG_IN_REQUEST, logIn);
}

function* watchLogOut() {
    yield takeLatest(LOG_OUT_REQUEST, logOut);
}

function* watchSignUp() {
    yield takeLatest(SIGN_UP_REQUEST, signUp);
}

export default function* userSaga() {
    yield all([fork(watchLogIn), fork(watchLogOut), fork(watchSignUp)]); // fork: 비동기가 아닌 동기 함수를 실행하는 이펙트
}
