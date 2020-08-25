// server-side rendering을 위한 HYDRATE
import { HYDRATE } from "next-redux-wrapper";
// 여러 파일에 나눠져 있는 reducer들을 합치는 역할을 수행하는 combineReducers
import { combineReducers } from "redux";
import user from "./user";
import post from "./post";

// 이게 바로 reducer이다.
// reducer는 액션을 받아 state를 변경하는 작업을 수행한다.
// (이전상태, 액션) => 다음상태
const rootReducer = combineReducers({
    index: (state = {}, action) => {
        switch (action.type) {
            case HYDRATE:
                return { ...state, ...action.payload };
            // reducer 초기화를 위한 default 액션 (에러 방지)
            default:
                return state;
        }
    },
    user,
    post
});

export default rootReducer;
