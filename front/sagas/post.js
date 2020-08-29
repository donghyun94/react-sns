import { all, fork, call, put, takeLatest, delay } from "redux-saga/effects";
import axios from "axios";
import shortid from "shortid";

import { ADD_POST_REQUEST, ADD_POST_SUCCESS, ADD_POST_FAILURE, REMOVE_POST_REQUEST, REMOVE_POST_SUCCESS, REMOVE_POST_FAILURE, ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE } from "../reducers/post";
import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from "../reducers/user";

// 게시글 추가
function addPostAPI(data) {
    return axios.post("/api/post", data);
}
function* addPost(action) {
    try {
        // const result = yield call(addPostAPI, action.data);
        yield delay(2000);
        const id = shortid.generate();
        yield put({
            type: ADD_POST_SUCCESS,
            data: { id, content: action.data },
        });
        yield put({
            type: ADD_POST_TO_ME,
            data: id,
        });
        console.log("saga add post success");
    } catch (err) {
        yield put({ type: ADD_POST_FAILURE, error: err.response.data });
    }
}

// 게시글 삭제
function removePostAPI(data) {
    return axios.delete("/api/post", data);
}
function* removePost(action) {
    try {
        // const result = yield call(addPostAPI, action.data);
        yield delay(2000);
        yield put({
            type: REMOVE_POST_SUCCESS,
            data: action.data, // 지울 게시글의 아이디가 들어있음
        });
        yield put({
            type: REMOVE_POST_OF_ME,
            data: action.data,
        });
        console.log("saga remove post success");
    } catch (err) {
        yield put({ type: REMOVE_POST_FAILURE, error: err.response.data });
    }
}

function addCommentAPI(data) {
    return axios.post(`/api/post/${data.postId}/comment`, data);
}
function* addComment(action) {
    try {
        // const result = yield call(addCommentAPI, action.data);
        yield delay(2000);
        yield put({
            type: ADD_COMMENT_SUCCESS,
            data: action.data,
        });
        console.log("saga add comment success");
    } catch (err) {
        yield put({
            type: ADD_COMMENT_FAILURE,
            error: err.response.data,
        });
    }
}

function* watchAddPost() {
    yield takeLatest(ADD_POST_REQUEST, addPost);
}

function* watchRemovePost() {
    yield takeLatest(REMOVE_POST_REQUEST, removePost);
}

function* watchAddComment() {
    yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

export default function* postSaga() {
    yield all([fork(watchAddPost), fork(watchRemovePost), fork(watchAddComment)]);
}
