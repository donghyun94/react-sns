import React, { useState } from "react";
import Head from "next/head";
import { Button, Checkbox, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";

import AppLayout from "../components/AppLayout";
import useInput from "../hooks/useInput";
import { SIGN_UP_REQUEST } from "../reducers/user";

const Signup = () => {
    const [passwordCheck, setPasswordCheck] = useState("");
    const [term, setTerm] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [termError, setTermError] = useState(false);

    const [email, onChangeEmail] = useInput("");
    const [nickname, onChangeNickname] = useInput("");
    const [password, onChangePassword] = useInput("");

    const dispatch = useDispatch();
    const { signupLoading } = useSelector((state) => state.user);

    const onSubmit = () => {
        // 패스워드 같게 썼는지 확인
        if (password !== passwordCheck) {
            setPasswordError(true);
            return;
        }

        // 체크박스 확인
        if (!term) {
            setTermError(true);
            return;
        }

        // 서버로 보낼 데이터
        console.log({
            email,
            nickname,
            password,
            passwordCheck,
            term,
        });

        // 액션 객체를 직접 생성하여 디스패치
        dispatch({
            type: SIGN_UP_REQUEST,
            data: { email, password, nickname },
        });
    };

    const onChangePasswordCheck = (e) => {
        setPasswordError(e.target.value !== password);
        setPasswordCheck(e.target.value);
    };

    // 체크박스 확인
    const onChangeTerm = (e) => {
        setTermError(false);
        setTerm(e.target.checked);
    };

    return (
        <>
            <Head>
                <title>NodeBird</title>
            </Head>
            <AppLayout>
                <Form onFinish={onSubmit} style={{ padding: 10 }}>
                    <div>
                        <label htmlFor="user-id">이메일</label>
                        <br />
                        <Input name="user-id" value={email} type="email" required onChange={onChangeEmail} />
                    </div>
                    <div>
                        <label htmlFor="user-nickname">닉네임</label>
                        <br />
                        <Input name="user-nickname" value={nickname} required onChange={onChangeNickname} />
                    </div>
                    <div>
                        <label htmlFor="user-password">비밀번호</label>
                        <br />
                        <Input name="user-password" type="password" value={password} required onChange={onChangePassword} />
                    </div>
                    <div>
                        <label htmlFor="user-password-check">비밀번호체크</label>
                        <br />
                        <Input name="user-password-check" type="password" value={passwordCheck} required onChange={onChangePasswordCheck} />
                        {passwordError && <div style={{ color: "red" }}>비밀번호가 일치하지 않습니다.</div>}
                    </div>
                    <div>
                        <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>
                            동현이의 말을 잘 들을 것을 동의합니다.
                        </Checkbox>
                        {termError && <div style={{ color: "red" }}>약관에 동의하셔야 합니다.</div>}
                    </div>
                    <div style={{ marginTop: 10 }}>
                        <Button type="primary" htmlType="submit" loading={signupLoading}>
                            가입하기
                        </Button>
                    </div>
                </Form>
            </AppLayout>
        </>
    );
};

export default Signup;
