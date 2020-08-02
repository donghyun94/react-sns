import React from "react";
import Link from "next/link";
import { Menu, Input, Row, Col } from "antd";
import { useSelector } from "react-redux";
import Styled from "styled-components";

import UserProfile from "../components/UserProfile";
import LoginForm from "../components/LoginForm";

const SearchInput = Styled(Input.Search)`
    width: 200px;
    vertical-align: middle;
`;

const AppLayout = ({ children }) => {
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn); // redux 를 이용하여 로그인 여부 관리
    return (
        <>
            <Menu mode="horizontal">
                <Menu.Item key="home">
                    <Link href="/">
                        <a>Home</a>
                    </Link>
                </Menu.Item>
                <Menu.Item key="profile">
                    <Link href="/profile">
                        <a>Profile</a>
                    </Link>
                </Menu.Item>
                <Menu.Item key="signup">
                    <Link href="/signup">
                        <a>Signup</a>
                    </Link>
                </Menu.Item>
                <SearchInput placeholder="input search text" onSearch={(value) => console.log(value)} />
            </Menu>
            <Row gutter={4}>
                <Col xs={24} md={6}>
                    {/* 로그인되어 있으면 유저의 프로필을 보여주고, 그게 아니면 로그인 창을 보여준다. */}
                    {isLoggedIn ? <UserProfile /> : <LoginForm />}
                </Col>
                <Col xs={24} md={12}>
                    {children}
                </Col>
                <Col xs={24} md={6}>
                    오른쪽 메뉴
                </Col>
            </Row>
        </>
    );
};

export default AppLayout;
