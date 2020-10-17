import { all, fork, call, put, takeLatest, delay } from "redux-saga/effects";
import axios from "axios";

import postSaga from "./post";
import userSaga from "./user";

// 요청의 기본이 되는 주소
axios.defaults.baseURL = "http://localhost:3065";

// 브라우저와 백엔드 간의 쿠키 전달을 위한 withCredentials
axios.defaults.withCredentials = true;

// 제네레이터를 이용한 사가
export default function* rootSaga() {
    // all: 여러 이펙트를 동시에 실행할 수 있게 해줌
    yield all([fork(postSaga), fork(userSaga)]); // fork: 비동기가 아닌 동기 함수를 실행하는 이펙트
}
