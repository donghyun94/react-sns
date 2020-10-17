import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import AppLayout from "../components/AppLayout";
import PostForm from "../components/PostForm";
import PostCard from "../components/PostCard";

import { LOAD_POSTS_REQUEST } from "../reducers/post";
import { LOAD_MY_INFO_REQUEST } from "../reducers/user";

const Home = () => {
    const { me, loginDone } = useSelector((state) => state.user);
    const { mainPosts, hasMorePost, loadPostsLoading } = useSelector((state) => state.post);

    const myStyles = useRef({
        background: "rgb(194,219,219)",
        background: "linear-gradient(180deg, rgba(194,219,219,1) 0%, rgba(220,229,221,1) 100%)",
        backgroundSize: "100% 800px",
    });

    const dispatch = useDispatch();

    // 유저의 로그인된 정보를 불러오는 액션을 디스패치한다.
    // 메인 화면을 마운트할 때 포스트를 불러오는 액션을 디스패치한다.
    useEffect(() => {
        dispatch({
            type: LOAD_MY_INFO_REQUEST,
        });
        dispatch({
            type: LOAD_POSTS_REQUEST,
        });
    }, []);

    // 스크롤을 끝까지 내리면 게시물을 더 불러오는 액션을 디스패치한다.
    useEffect(() => {
        function onScroll() {
            // 현재 스크롤 위치(화면 상단 기준), 브라우저 화면의 높이, 총 높이
            console.log(window.scrollY, document.documentElement.clientHeight, document.documentElement.scrollHeight);

            // 현재 스크롤 위치와 브라우저의 높이를 더했을 때 총 높이가 된다면? 스크롤이 맨 아래에 있다는 뜻. 300픽셀 정도 남겼을 때 로딩하기!
            if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 500) {
                // 불러올 게시물이 있고, 로딩중이 아닐 경우 요청 디스패치!
                if (hasMorePost && !loadPostsLoading) {
                    dispatch({
                        type: LOAD_POSTS_REQUEST,
                    });
                }
            }
        }
        window.addEventListener("scroll", onScroll);

        // unmount
        return () => {
            window.removeEventListener("scroll", onScroll);
        };
    }, [hasMorePost, loadPostsLoading]);

    return (
        <>
            <AppLayout>
                <div style={myStyles.current}>
                    {/* PostForm 컴포넌트는 로그인 한 상태일 때만 보임 */}
                    {loginDone && <PostForm />}
                    {mainPosts.map((post) => (
                        <PostCard key={post.id} post={post} />
                    ))}
                </div>
            </AppLayout>
        </>
    );
};

export default Home;
