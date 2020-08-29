import shortid from "shortid";
import produce from "immer"; // 불변성 유지에 참 좋은 immer

// user 기본 state 구조
const initialState = {
    mainPosts: [
        {
            id: 1,
            User: { id: 1, nickname: "동현이" },
            content: "동현이의 첫 번째 게시글! #아잉 #조아요",
            Images: [{ src: "https://expanddesk-media.s3.amazonaws.com/hosting/740px-Google_Docs_logo.svg.png" }, { src: "https://expanddesk-media.s3.amazonaws.com/hosting/logo_google-drive.png" }],
            Comments: [
                {
                    id: shortid.generate(),
                    User: { id: shortid.generate(), nickname: "동현삼" },
                    content: "꺄악",
                },
                {
                    id: shortid.generate(),
                    User: { id: shortid.generate(), nickname: "동현사" },
                    content: "아이조아",
                },
            ],
        },
    ],
    // 이미지 업로드할 때의 경로
    imagePaths: [],

    // 게시글 추가가 완료되었는지 여부
    addPostLoading: false,
    addPostDone: false,
    addPostError: null,

    // 게시글 삭제가 완료되었는지 여부
    removePostLoading: false,
    removePostDone: false,
    removePostError: null,

    // 댓글 추가가 완료되었는지 여부
    addCommentLoading: false,
    addCommentDone: false,
    addCommentError: null,
};

const dummyPost = (data) => ({
    id: data.id,
    content: data.content,
    User: { id: 1, nickname: "동현이" },
    Images: [],
    Comments: [],
});

const dummyComment = (data) => ({
    id: shortid.generate(),
    content: data,
    User: {
        id: 1,
        nickname: "동현이",
    },
});

// 액션 오타 방지용
export const ADD_POST_REQUEST = "ADD_POST_REQUEST";
export const ADD_POST_SUCCESS = "ADD_POST_SUCCESS";
export const ADD_POST_FAILURE = "ADD_POST_FAILURE";
export const REMOVE_POST_REQUEST = "REMOVE_POST_REQUEST";
export const REMOVE_POST_SUCCESS = "REMOVE_POST_SUCCESS";
export const REMOVE_POST_FAILURE = "REMOVE_POST_FAILURE";
export const ADD_COMMENT_REQUEST = "ADD_COMMENT_REQUEST";
export const ADD_COMMENT_SUCCESS = "ADD_COMMENT_SUCCESS";
export const ADD_COMMENT_FAILURE = "ADD_COMMENT_FAILURE";

export const addPostAction = (data) => {
    return {
        type: ADD_POST_REQUEST,
        data,
    };
};

// immer를 이용하면 불변성이고 나발이고 쉽게 상태를 바꿀 수 있다!
const reducer = (state = initialState, action) => {
    return produce(state, (draft) => {
        switch (action.type) {
            // 포스트 추가 액션
            case ADD_POST_REQUEST:
                draft.addPostLoading = true;
                draft.addPostDone = false;
                draft.addPostError = null;
                break;
            case ADD_POST_SUCCESS:
                draft.mainPosts.unshift(dummyPost(action.data)); // immer를 이용해 배열의 맨 앞에 바로 추가
                draft.addPostLoading = false;
                draft.addPostDone = true;
                break;
            case ADD_POST_FAILURE:
                draft.addPostLoading = false;
                draft.addPostError = action.error;
                break;

            // 포스트 삭제 액션
            case REMOVE_POST_REQUEST:
                draft.removePostLoading = true;
                draft.removePostDone = false;
                draft.removePostError = null;
                break;
            case REMOVE_POST_SUCCESS:
                draft.mainPosts = draft.mainPosts.filter((v) => v.id !== action.data); // 지울 때는 필터를 이용
                draft.removePostLoading = false;
                draft.removePostDone = true;
                break;
            case REMOVE_POST_FAILURE:
                draft.removePostLoading = false;
                draft.removePostError = action.error;
                break;

            // 코멘트 액션
            case ADD_COMMENT_REQUEST:
                draft.addCommentLoading = true;
                draft.addCommentDone = false;
                draft.addCommentError = null;
                break;
            case ADD_COMMENT_SUCCESS: {
                const post = draft.mainPosts.find((v) => v.id === action.data.postId); // 해당 아이디의 게시물 찾기
                post.Comments.unshift(dummyComment(action.data.content)); // 추가하고 끝~
                draft.addCommentLoading = false;
                draft.addCommentDone = true;
                break;
            }
            case ADD_COMMENT_FAILURE:
                draft.addCommentLoading = false;
                draft.addCommentError = action.error;
                break;

            default:
                break;
        }
    });

    // switch (action.type) {
    //     // 포스트 추가 액션
    //     case ADD_POST_REQUEST:
    //         console.log("reducer add post request");
    //         return {
    //             ...state,
    //             addPostLoading: true,
    //             addPostDone: false,
    //             addPostError: null,
    //         };
    //     case ADD_POST_SUCCESS:
    //         console.log("reducer add post success");
    //         return {
    //             ...state,
    //             mainPosts: [dummyPost(action.data), ...state.mainPosts],
    //             addPostLoading: false,
    //             addPostDone: true,
    //         };
    //     case ADD_POST_FAILURE:
    //         console.log("reducer add post failure");
    //         return {
    //             ...state,
    //             addPostLoading: false,
    //             addPostError: action.error,
    //         };

    //     // 포스트 삭제 액션
    //     case REMOVE_POST_REQUEST:
    //         console.log("reducer remove post request");
    //         return {
    //             ...state,
    //             removePostLoading: true,
    //             removePostDone: false,
    //             removePostError: null,
    //         };
    //     case REMOVE_POST_SUCCESS:
    //         console.log("reducer remove post success");
    //         return {
    //             ...state,
    //             mainPosts: state.mainPosts.filter((v) => v.id !== action.data), // 지울 때는 필터를 이용
    //             removePostLoading: false,
    //             removePostDone: true,
    //         };
    //     case REMOVE_POST_FAILURE:
    //         console.log("reducer remove post failure");
    //         return {
    //             ...state,
    //             removePostLoading: false,
    //             removePostError: action.error,
    //         };

    //     // 코멘트 액션
    //     case ADD_COMMENT_REQUEST:
    //         console.log("reducer add comment request");
    //         return {
    //             ...state,
    //             addCommentLoading: true,
    //             addCommentDone: false,
    //             addCommentError: null,
    //         };
    //     case ADD_COMMENT_SUCCESS: {
    //         const postIndex = state.mainPosts.findIndex((v) => v.id === action.data.postId);
    //         const post = { ...state.mainPosts[postIndex] };
    //         post.Comments = [dummyComment(action.data.content), ...post.Comments];
    //         const mainPosts = [...state.mainPosts];
    //         mainPosts[postIndex] = post;
    //         return {
    //             ...state,
    //             mainPosts,
    //             addCommentLoading: false,
    //             addCommentDone: true,
    //         };
    //     }
    //     case ADD_COMMENT_FAILURE:
    //         console.log("reducer add comment failure");
    //         return {
    //             ...state,
    //             addCommentLoading: false,
    //             addCommentError: action.error,
    //         };

    //     default:
    //         return state;
    // }
};

export default reducer;
