import { HYDRATE } from "next-redux-wrapper";
import { combineReducers } from "redux"; // 여러 파일에 나눠져 있는 reducer들을 합친다.
import user from "./user";
import post from "./post";

// 이것이 reducer. (이전상태, 액션) => 다음상태
const rootReducer = combineReducers({
    index: (state = {}, action) => {
        switch (action.type) {
            case "HYDRATE":
                return { ...state, ...action.payload };
            default:
                return state;
        }
    },
    user,
    post
});

export default rootReducer;
