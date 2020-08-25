// 유저 state의 기본 구조
const initialState = {
    isLoggedIn: false,
    user: null,
    signUpData: {},
    loginData: {}
};

// 동적으로 로그인 데이터를 바꿀 수 있는 액션 함수
export const loginAction = (data) => {
    return {
        type: "LOG_IN",
        data
    };
};

export const logoutAction = () => {
    return {
        type: "LOG_OUT"
    };
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        // 로그인 액션
        case "LOG_IN":
            return {
                ...state,
                isLoggedIn: true,
                user: action.data
            };

        // 로그아웃 액션
        case "LOG_OUT":
            return {
                ...state,
                isLoggedIn: false,
                user: null
            };

        default:
            return state;
    }
};

export default reducer;
