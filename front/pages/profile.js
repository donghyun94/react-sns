import React, { useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import AppLayout from "../components/AppLayout";
import NicknameEdit from "../components/NicknameEdit";
import FollowList from "../components/FollowList";
import { useSelector } from "react-redux";
import Router from "next/router";

const Profile = () => {
    const { me } = useSelector((state) => state.user);

    // 로그아웃 상태이면 메인 페이지로 이동
    useEffect(() => {
        if (!(me && me.id)) {
            Router.push("/");
        }
    }, [[me && me.id]]);

    if (!me) return null;

    return (
        <>
            <AppLayout>
                <NicknameEdit />
                <FollowList header="팔로잉 목록" data={me.Followings} />
                <FollowList header="팔로워 목록" data={me.Followers} />
            </AppLayout>
        </>
    );
};

export default Profile;
