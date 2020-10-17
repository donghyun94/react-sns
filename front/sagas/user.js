import { all, fork, call, put, takeLatest, delay } from "redux-saga/effects";
import axios from "axios";

import {
    LOG_IN_REQUEST,
    LOG_IN_SUCCESS,
    LOG_IN_FAILURE,
    LOG_OUT_REQUEST,
    LOG_OUT_SUCCESS,
    LOG_OUT_FAILURE,
    LOAD_MY_INFO_REQUEST,
    LOAD_MY_INFO_SUCCESS,
    LOAD_MY_INFO_FAILURE,
    SIGN_UP_REQUEST,
    SIGN_UP_SUCCESS,
    SIGN_UP_FAILURE,
    FOLLOW_REQUEST,
    FOLLOW_SUCCESS,
    FOLLOW_FAILURE,
    UNFOLLOW_REQUEST,
    UNFOLLOW_SUCCESS,
    UNFOLLOW_FAILURE,
    CHANGE_NICKNAME_REQUEST,
    CHANGE_NICKNAME_SUCCESS,
    CHANGE_NICKNAME_FAILURE,
} from "../reducers/user";

// 서버에 데이터를 요청하는 함수. 얘는 제네레이터 아님!
function signUpAPI(data) {
    return axios.post("/user", data);
}

// SIGN_UP_REQUEST 액션 함수(리듀서 안의 signupRequestAction)에 담긴 데이터가 자동으로 signUp 함수의 매개변수로 전달 됨.
function* signUp(action) {
    try {
        // call: 비동기 함수를 실행하는 이펙트. 여기서는 signUpAPI가 데이터를 받아올 때까지 기다림
        // call의 두 번째 인자인 action.data가 signUpAPI의 인자로 들어간다.
        const result = yield call(signUpAPI, action.data);
        console.log(result);
        console.log("saga signup request");
        yield put({
            type: SIGN_UP_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        // 상태코드가 400~500번대일 경우 실패
        yield put({ type: SIGN_UP_FAILURE, error: err.response.data });
    }
}

function logInAPI(data) {
    return axios.post("/user/login", data);
}

function* logIn(action) {
    try {
        const result = yield call(logInAPI, action.data);
        // put: dispatch와 같은 기능을 하는 이펙트
        yield put({
            type: LOG_IN_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        yield put({ type: LOG_IN_FAILURE, error: err.response.data });
    }
}

// 로그아웃도 비슷한 패턴으로 제작하여 사용
function logOutAPI() {
    return axios.post("/user/logout");
}

function* logOut() {
    try {
        yield call(logOutAPI);
        console.log("saga logout request");
        yield put({
            type: LOG_OUT_SUCCESS,
        });
    } catch (err) {
        yield put({ type: LOG_OUT_FAILURE, error: err.response.data });
    }
}

// 로그인 된 유저의 정보 불러오기
function loadUserAPI() {
    return axios.get("/user");
}

function* loadUser(action) {
    try {
        const result = yield call(loadUserAPI, action.data);
        console.log("saga load user success");
        yield put({
            type: LOAD_MY_INFO_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        yield put({ type: LOAD_MY_INFO_FAILURE, error: err.response.data });
    }
}

// 닉네임 바꾸기
function changeNicknameAPI(data) {
    return axios.patch("/user/nickname", { nickname: data });
}
function* changeNickname(action) {
    try {
        const result = yield call(changeNicknameAPI, action.data);
        yield put({
            type: CHANGE_NICKNAME_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        yield put({
            type: CHANGE_NICKNAME_FAILURE,
            error: err.response.data,
        });
    }
}

function followAPI() {
    return axios.post("/user/follow");
}

function* follow(action) {
    try {
        // const result = yield call(signUpAPI);
        yield delay(2000);
        console.log("saga follow request");
        yield put({
            type: FOLLOW_SUCCESS,
            data: action.data,
        });
    } catch (err) {
        yield put({ type: FOLLOW_FAILURE, error: err.response.data });
    }
}

function unfollowAPI() {
    return axios.post("/user/follow");
}

function* unfollow(action) {
    try {
        // const result = yield call(signUpAPI);
        yield delay(2000);
        console.log("saga unfollow request");
        yield put({
            type: UNFOLLOW_SUCCESS,
            data: action.data,
        });
    } catch (err) {
        yield put({ type: UNFOLLOW_FAILURE, error: err.response.data });
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

function* watchLoadUser() {
    yield takeLatest(LOAD_MY_INFO_REQUEST, loadUser);
}

function* watchSignUp() {
    yield takeLatest(SIGN_UP_REQUEST, signUp);
}

function* watchChangeNickname() {
    yield takeLatest(CHANGE_NICKNAME_REQUEST, changeNickname);
}

function* watchFollow() {
    yield takeLatest(FOLLOW_REQUEST, follow);
}

function* watchUnfollow() {
    yield takeLatest(UNFOLLOW_REQUEST, unfollow);
}

export default function* userSaga() {
    yield all([fork(watchLogIn), fork(watchLogOut), fork(watchLoadUser), fork(watchSignUp), fork(watchChangeNickname), fork(watchFollow), fork(watchUnfollow)]); // fork: 비동기가 아닌 동기 함수를 실행하는 이펙트
}
