import React from "react";
import { useSelector } from "react-redux";

import AppLayout from "../components/AppLayout";
import PostForm from "../components/PostForm";
import PostCard from "../components/PostCard";

const Home = () => {
    const { isLoggedIn } = useSelector((state) => state.user);
    const { mainPosts } = useSelector((state) => state.post);

    return (
        <>
            <AppLayout>
                {/* PostForm 컴포넌트는 로그인 한 상태일 때만 보임 */}
                {isLoggedIn && <PostForm />}
                {mainPosts.map((post) => (
                    <PostCard key={post.id} post={post} />
                ))}
            </AppLayout>
        </>
    );
};

export default Home;
