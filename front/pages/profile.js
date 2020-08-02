import React from "react";
import ReactDOM from "react-dom";
import Head from "next/head";
import Link from "next/link";
import AppLayout from "../components/AppLayout";
import NicknameEdit from "../components/NicknameEdit";
import FollowList from "../components/FollowList";

const Profile = () => {
    const FollowingData = [{ nickname: "김똘똘" }, { nickname: "박똘똘" }, { nickname: "최똘똘" }, { nickname: "똘똘" }, { nickname: "고똘똘" }, { nickname: "최똘똘" }, { nickname: "최똘똘" }, { nickname: "최똘똘" }];
    const FollowerData = [{ nickname: "강똘똘" }, { nickname: "이똘똘" }];
    return (
        <>
            <AppLayout>
                <NicknameEdit />
                <FollowList header="팔로잉 목록" data={FollowingData} />
                <FollowList header="팔로워 목록" data={FollowerData} />
            </AppLayout>
        </>
    );
};

export default Profile;
