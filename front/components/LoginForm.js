import React, { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { Form, Input, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
// 로그인을 위한 액션 함수 가져오기
import { loginRequestAction } from "../reducers/user";
import Styled from "styled-components";

// styled components 사용을 통해 나만의 css 요소를 사용!
const ButtonWrapper = Styled.div`margin-top: 10px;`;
const LoginInput = Styled(Input)`display: block; width: 200px;`;

const LoginForm = () => {
    const [email, setId] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    const { loginLoading, loginError } = useSelector((state) => state.user);

    const onChangeEmail = useCallback((e) => {
        setId(e.target.value);
    }, []);
    const onChangePw = useCallback((e) => {
        setPassword(e.target.value);
    }, []);

    const submitHandler = useCallback(() => {
        // redux 디스패치를 이용하여 로그인 데이터 전달
        dispatch(loginRequestAction({ email, password }));
    }, [email, password]);

    useEffect(() => {
        if (loginError) {
            alert(loginError);
        }
    }, [loginError]);
    return (
        <>
            <Form onFinish={submitHandler}>
                <div>
                    <label htmlFor="user-id">이메일</label>
                    <LoginInput name="user-id" value={email} type="email" onChange={onChangeEmail} required />
                </div>
                <div>
                    <label htmlFor="user-password">비밀번호</label>
                    <LoginInput name="user-password" type="password" value={password} onChange={onChangePw} required />
                </div>
                <ButtonWrapper>
                    <Button type="primary" htmlType="submit" loading={loginLoading}>
                        로그인
                    </Button>
                    <Link href="/signup">
                        <a>
                            <Button>회원가입</Button>
                        </a>
                    </Link>
                </ButtonWrapper>
            </Form>
        </>
    );
};

export default LoginForm;
