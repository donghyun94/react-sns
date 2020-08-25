import React, { useState, useCallback } from "react";
import Link from "next/link";
import { Form, Input, Button } from "antd";
import { useDispatch } from "react-redux";
// 로그인을 위한 액션 함수 가져오기
import { loginAction } from "../reducers/user";
import Styled from "styled-components";

// styled components 사용을 통해 나만의 css 요소를 사용!
const ButtonWrapper = Styled.div`margin-top: 10px;`;
const LoginInput = Styled(Input)`display: block; width: 200px;`;

const LoginForm = () => {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();

    const onChangeId = useCallback((e) => {
        setId(e.target.value);
    }, []);
    const onChangePw = useCallback((e) => {
        setPassword(e.target.value);
    }, []);

    const submitHandler = useCallback(() => {
        // redux 액션 함수를 이용하여 로그인 데이터 전달
        dispatch(loginAction({ id, password }));
    }, [id, password]);

    return (
        <>
            <Form onFinish={submitHandler}>
                <div>
                    <label htmlFor="user-id">아이디</label>
                    <LoginInput name="user-id" value={id} onChange={onChangeId} required />
                </div>
                <div>
                    <label htmlFor="user-password">비밀번호</label>
                    <LoginInput name="user-password" type="password" value={password} onChange={onChangePw} required />
                </div>
                <ButtonWrapper>
                    <Button type="primary" htmlType="submit" loading={false}>
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
