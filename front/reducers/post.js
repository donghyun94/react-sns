import produce from "immer"; // 불변성 유지에 참 좋은 immer

// user 기본 state 구조
const initialState = {
    mainPosts: [],

    // 이미지 업로드할 때의 경로
    imagePaths: [],

    // 더 불러올 게시물이 있는지 여부
    hasMorePost: true,

    // 게시글 로딩이 완료되었는지 여부
    loadPostsLoading: false,
    loadPostsDone: false,
    loadPostsError: null,

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

    // 좋아요 되었는지 여부
    likePostLoading: false,
    likePostDone: false,
    likePostError: null,

    // 좋아요 취소 되었는지 여부
    unlikePostLoading: false,
    unlikePostDone: false,
    unlikePostError: null,
};

// 액션 오타 방지용
export const LOAD_POSTS_REQUEST = "LOAD_POSTS_REQUEST";
export const LOAD_POSTS_SUCCESS = "LOAD_POSTS_SUCCESS";
export const LOAD_POSTS_FAILURE = "LOAD_POSTS_FAILURE";
export const ADD_POST_REQUEST = "ADD_POST_REQUEST";
export const ADD_POST_SUCCESS = "ADD_POST_SUCCESS";
export const ADD_POST_FAILURE = "ADD_POST_FAILURE";
export const REMOVE_POST_REQUEST = "REMOVE_POST_REQUEST";
export const REMOVE_POST_SUCCESS = "REMOVE_POST_SUCCESS";
export const REMOVE_POST_FAILURE = "REMOVE_POST_FAILURE";
export const ADD_COMMENT_REQUEST = "ADD_COMMENT_REQUEST";
export const ADD_COMMENT_SUCCESS = "ADD_COMMENT_SUCCESS";
export const ADD_COMMENT_FAILURE = "ADD_COMMENT_FAILURE";
export const LIKE_POST_REQUEST = "LIKE_POST_REQUEST";
export const LIKE_POST_SUCCESS = "LIKE_POST_SUCCESS";
export const LIKE_POST_FAILURE = "LIKE_POST_FAILURE";
export const UNLIKE_POST_REQUEST = "UNLIKE_POST_REQUEST";
export const UNLIKE_POST_SUCCESS = "UNLIKE_POST_SUCCESS";
export const UNLIKE_POST_FAILURE = "UNLIKE_POST_FAILURE";

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
            // 포스트 로드 액션
            case LOAD_POSTS_REQUEST:
                draft.loadPostsLoading = true;
                draft.loadPostsDone = false;
                draft.loadPostsError = null;
                break;
            case LOAD_POSTS_SUCCESS:
                draft.loadPostsLoading = false;
                draft.loadPostsDone = true;
                draft.mainPosts = action.data.concat(draft.mainPosts); // 포스트 목록을 불러와서 추가함
                draft.hasMorePost = draft.mainPosts.length < 50; // 불러온 게시글이 50개 이상이면 더 이상 안불러올거임
                break;
            case LOAD_POSTS_FAILURE:
                draft.loadPostsLoading = false;
                draft.loadPostsError = action.error;
                break;

            // 포스트 추가 액션
            case ADD_POST_REQUEST:
                draft.addPostLoading = true;
                draft.addPostDone = false;
                draft.addPostError = null;
                break;
            case ADD_POST_SUCCESS:
                draft.mainPosts.unshift(action.data); // immer를 이용해 배열의 맨 앞에 바로 추가
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
                draft.mainPosts = draft.mainPosts.filter((v) => v.id !== action.data.PostId); // 지울 때는 필터를 이용
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
                const post = draft.mainPosts.find((v) => v.id === action.data.PostId); // 해당 아이디의 게시물 찾기
                post.Comments.unshift(action.data); // 추가하고 끝~
                draft.addCommentLoading = false;
                draft.addCommentDone = true;
                break;
            }
            case ADD_COMMENT_FAILURE:
                draft.addCommentLoading = false;
                draft.addCommentError = action.error;
                break;

            // 좋아요 액션
            case LIKE_POST_REQUEST:
                draft.likePostLoading = true;
                draft.likePostDone = false;
                draft.likePostError = null;
                break;
            case LIKE_POST_SUCCESS: {
                const post = draft.mainPosts.find((v) => v.id === action.data.PostId);
                post.Likers.push({ id: action.data.UserId }); // 좋아요 누른 사람 목록에 나를 추가한다.
                draft.likePostLoading = false;
                draft.likePostDone = true;
                break;
            }
            case LIKE_POST_FAILURE:
                draft.likePostLoading = false;
                draft.likePostError = action.error;
                break;

            // 좋아요 취소 액션
            case UNLIKE_POST_REQUEST:
                draft.unlikePostLoading = true;
                draft.unlikePostDone = false;
                draft.unlikePostError = null;
                break;
            case UNLIKE_POST_SUCCESS: {
                const post = draft.mainPosts.find((v) => v.id === action.data.PostId);
                post.Likers = post.Likers.filter((v) => v.id !== action.data.UserId); // 좋아요 누른 사람 목록에서 나를 제거한다.
                draft.unlikePostLoading = false;
                draft.unlikePostDone = true;
                break;
            }
            case UNLIKE_POST_FAILURE:
                draft.unlikePostLoading = false;
                draft.unlikePostError = action.error;
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
