import produce from "immer";

// 유저 state의 기본 구조
const initialState = {
    loginLoading: false, // 로그인 시도 중
    loginDone: false,
    loginError: null,
    logoutLoading: false, // 로그아웃 시도 중
    logoutDone: false,
    logoutError: null,
    signupLoading: false, // 회원가입 시도 중
    signupDone: false,
    signupError: null,
    changeNicknameLoading: false, // 닉네임 변경 시도 중
    changeNicknameDone: false,
    changeNicknameError: null,
    followLoading: false, // 팔로우 시도 중
    followDone: false,
    followError: null,
    unfollowLoading: false, // 언팔 시도 중
    unfollowDone: false,
    unfollowError: null,
    me: null,
    signUpData: {},
    loginData: {},
};

const dummyUser = (data) => {
    return {
        ...data,
        nickname: "donghyun",
        id: 1,
        Posts: [{ id: 1 }],
        Followings: [{ nickname: "동현일" }, { nickname: "동현삼" }, { nickname: "동현사" }, { nickname: "동현오" }],
        Followers: [{ nickname: "동현오" }, { nickname: "동현육" }, { nickname: "동현칠" }],
    };
};

// 오타 방지를 위해 액션 타입을 미리 변수에 할당한다.
export const LOG_IN_REQUEST = "LOG_IN_REQUEST";
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS";
export const LOG_IN_FAILURE = "LOG_IN_FAILURE";
export const LOG_OUT_REQUEST = "LOG_OUT_REQUEST";
export const LOG_OUT_SUCCESS = "LOG_OUT_SUCCESS";
export const LOG_OUT_FAILURE = "LOG_OUT_FAILURE";
export const SIGN_UP_REQUEST = "SIGN_UP_REQUEST";
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";
export const SIGN_UP_FAILURE = "SIGN_UP_FAILURE";
export const CHANGE_NICKNAME_REQUEST = "CHANGE_NICKNAME_REQUEST";
export const CHANGE_NICKNAME_SUCCESS = "CHANGE_NICKNAME_SUCCESS";
export const CHANGE_NICKNAME_FAILURE = "CHANGE_NICKNAME_FAILURE";
export const FOLLOW_REQUEST = "FOLLOW_REQUEST";
export const FOLLOW_SUCCESS = "FOLLOW_SUCCESS";
export const FOLLOW_FAILURE = "FOLLOW_FAILURE";
export const UNFOLLOW_REQUEST = "UNFOLLOW_REQUEST";
export const UNFOLLOW_SUCCESS = "UNFOLLOW_SUCCESS";
export const UNFOLLOW_FAILURE = "UNFOLLOW_FAILURE";
// 나의 게시글 목록을 추가하고 삭제하는 액션
export const ADD_POST_TO_ME = "ADD_POST_TO_ME";
export const REMOVE_POST_OF_ME = "REMOVE_POST_OF_ME";

// 동적으로 로그인 데이터를 바꿀 수 있는 액션 함수
export const loginRequestAction = (data) => {
    return {
        type: LOG_IN_REQUEST,
        data,
    };
};

export const logoutRequestAction = () => {
    return {
        type: LOG_OUT_REQUEST,
    };
};

const reducer = (state = initialState, action) => {
    return produce(state, (draft) => {
        switch (action.type) {
            // 로그인 액션
            case LOG_IN_REQUEST:
                draft.loginLoading = true;
                draft.loginError = null;
                draft.loginDone = false;
                break;
            case LOG_IN_SUCCESS:
                draft.loginLoading = false;
                draft.loginDone = true;
                draft.me = dummyUser(action.data);
                break;
            case LOG_IN_FAILURE:
                draft.loginLoading = false;
                draft.loginDone = false;
                break;

            // 로그아웃 액션
            case LOG_OUT_REQUEST:
                draft.logoutLoading = true;
                draft.logoutDone = false;
                draft.logoutError = null;
                break;
            case LOG_OUT_SUCCESS:
                draft.logoutLoading = false;
                draft.logoutDone = true;
                draft.me = null;
                break;
            case LOG_OUT_FAILURE:
                draft.logoutLoading = false;
                draft.logoutError = action.error;
                break;

            // 회원가입 액션
            case SIGN_UP_REQUEST:
                draft.signupLoading = true;
                draft.signupDone = false;
                draft.signupError = null;
                break;
            case SIGN_UP_SUCCESS:
                draft.signupLoading = false;
                draft.signupDone = true;
                break;
            case SIGN_UP_FAILURE:
                draft.signupLoading = false;
                draft.signupError = action.error;
                break;

            // 닉네임 변경 액션
            case CHANGE_NICKNAME_REQUEST:
                draft.changeNicknameLoading = true;
                draft.changeNicknameDone = false;
                draft.changeNicknameError = null;
                break;
            case CHANGE_NICKNAME_SUCCESS:
                draft.changeNicknameLoading = false;
                draft.changeNicknameDone = true;
                break;
            case CHANGE_NICKNAME_FAILURE:
                draft.changeNicknameLoading = false;
                draft.changeNicknameError = action.error;
                break;

            // 팔로우 액션
            case FOLLOW_REQUEST:
                draft.followLoading = true;
                draft.followDone = false;
                draft.followError = null;
                break;
            case FOLLOW_SUCCESS:
                draft.followLoading = false;
                draft.followDone = true;
                break;
            case FOLLOW_FAILURE:
                draft.followLoading = false;
                draft.followError = action.error;
                break;

            // 언팔로우 액션
            case UNFOLLOW_REQUEST:
                draft.unfollowLoading = true;
                draft.unfollowDone = false;
                draft.unfollowError = null;
                break;
            case UNFOLLOW_SUCCESS:
                draft.unfollowLoading = false;
                draft.unfollowDone = true;
                break;
            case UNFOLLOW_FAILURE:
                draft.unfollowLoading = false;
                draft.unfollowError = action.error;
                break;

            // 나의 게시글 목록 추가
            case ADD_POST_TO_ME:
                draft.me.Posts.unshift({ id: action.data });
                break;

            // 나의 게시글 목록 삭제
            case REMOVE_POST_OF_ME:
                draft.me.Posts = draft.me.Posts.filter((v) => v.id !== action.data);
                break;

            default:
                break;
        }
    });
    // switch (action.type) {
    //     // 로그인 액션
    //     case LOG_IN_REQUEST:
    //         console.log("reducer login request");
    //         return {
    //             ...state,
    //             loginLoading: true,
    //             loginError: null,
    //             loginDone: false,
    //         };

    //     case LOG_IN_SUCCESS:
    //         return {
    //             ...state,
    //             loginLoading: false,
    //             loginDone: true,
    //             me: dummyUser(action.data),
    //         };

    //     case LOG_IN_FAILURE:
    //         return {
    //             ...state,
    //             loginLoading: false,
    //             loginDone: false,
    //         };

    //     // 로그아웃 액션
    //     case LOG_OUT_REQUEST:
    //         console.log("reducer logout request");
    //         return {
    //             ...state,
    //             logoutLoading: true,
    //             logoutDone: false,
    //             logoutError: null,
    //         };

    //     case LOG_OUT_SUCCESS:
    //         return {
    //             ...state,
    //             logoutLoading: false,
    //             logoutDone: true,
    //             me: null,
    //         };

    //     case LOG_OUT_FAILURE:
    //         return {
    //             ...state,
    //             logoutLoading: false,
    //             logoutError: action.error,
    //         };

    //     // 회원가입 액션
    //     case SIGN_UP_REQUEST:
    //         console.log("reducer signup request");
    //         return {
    //             ...state,
    //             signupLoading: true,
    //             signupDone: false,
    //             signupError: null,
    //         };

    //     case SIGN_UP_SUCCESS:
    //         return {
    //             ...state,
    //             signupLoading: false,
    //             signupDone: true,
    //         };

    //     case SIGN_UP_FAILURE:
    //         return {
    //             ...state,
    //             signupLoading: false,
    //             signupError: action.error,
    //         };

    //     // 닉네임 변경 액션
    //     case CHANGE_NICKNAME_REQUEST:
    //         console.log("reducer change nickname request");
    //         return {
    //             ...state,
    //             changeNicknameLoading: true,
    //             changeNicknameDone: false,
    //             changeNicknameError: null,
    //         };

    //     case CHANGE_NICKNAME_SUCCESS:
    //         return {
    //             ...state,
    //             changeNicknameLoading: false,
    //             changeNicknameDone: true,
    //         };

    //     case CHANGE_NICKNAME_FAILURE:
    //         return {
    //             ...state,
    //             changeNicknameLoading: false,
    //             changeNicknameError: action.error,
    //         };

    //     // 팔로우 액션
    //     case FOLLOW_REQUEST:
    //         console.log("reducer follow request");
    //         return {
    //             ...state,
    //             followLoading: true,
    //             followDone: false,
    //             followError: null,
    //         };

    //     case FOLLOW_SUCCESS:
    //         return {
    //             ...state,
    //             followLoading: false,
    //             followDone: true,
    //         };

    //     case FOLLOW_FAILURE:
    //         return {
    //             ...state,
    //             followLoading: false,
    //             followError: action.error,
    //         };

    //     // 언팔로우 액션
    //     case UNFOLLOW_REQUEST:
    //         console.log("reducer unfollow request");
    //         return {
    //             ...state,
    //             unfollowLoading: true,
    //             unfollowDone: false,
    //             unfollowError: null,
    //         };

    //     case UNFOLLOW_SUCCESS:
    //         return {
    //             ...state,
    //             unfollowLoading: false,
    //             unfollowDone: true,
    //         };

    //     case UNFOLLOW_FAILURE:
    //         return {
    //             ...state,
    //             unfollowLoading: false,
    //             unfollowError: action.error,
    //         };

    //     // 나의 게시글 목록 추가
    //     case ADD_POST_TO_ME:
    //         return {
    //             ...state,
    //             me: {
    //                 ...state.me,
    //                 Posts: [{ id: action.data }, ...state.me.Posts],
    //             },
    //         };

    //     // 나의 게시글 목록 삭제
    //     case REMOVE_POST_OF_ME:
    //         return {
    //             ...state,
    //             me: {
    //                 ...state.me,
    //                 Posts: state.me.Posts.filter((v) => v.id !== action.data),
    //             },
    //         };
    //     default:
    //         return state;
    // }
};

export default reducer;
