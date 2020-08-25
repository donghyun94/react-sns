// 기본 구조
const initialState = {
    mainPosts: [
        {
            id: 1,
            User: { id: 1, nickname: "동현이" },
            content: "동현이의 첫 번째 게시글! #아잉 #조아요",
            Images: [{ src: "https://expanddesk-media.s3.amazonaws.com/hosting/740px-Google_Docs_logo.svg.png" }, { src: "https://expanddesk-media.s3.amazonaws.com/hosting/logo_google-drive.png" }],
            Comments: [
                {
                    User: { nickname: "동현삼" },
                    content: "꺄악"
                },
                {
                    User: { nickname: "동현사" },
                    content: "아이조아"
                }
            ]
        }
    ],
    // 이미지 업로드할 때의 경로
    imagePaths: [],
    // 게시글 추가가 완료되었는지 여부
    postAdded: false
};

const dummyPost = {
    id: 2,
    content: "더미 포스트입니다.",
    User: { id: 1, nickname: "동현이" },
    Images: [],
    Comments: []
};

export const addPostAction = () => {
    return {
        type: "ADD_POST"
    };
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        // 목록의 가장 앞 부분에 새로운 포스트를 추가함.
        case "ADD_POST":
            return {
                ...state,
                mainPosts: [dummyPost, ...state.mainPosts],
                postAdded: true
            };
        default:
            return state;
    }
};

export default reducer;
