import React from "react";
import Head from "next/head";
import Link from "next/link";
import AppLayout from "../components/AppLayout";
import NicknameEdit from "../components/NicknameEdit";
import FollowList from "../components/FollowList";
import { useSelector } from "react-redux";

const Profile = () => {
    const { me } = useSelector((state) => state.user);

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
