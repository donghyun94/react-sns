import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Input } from "antd";
import Styled from "styled-components";

import useInput from "../hooks/useInput";
import { CHANGE_NICKNAME_REQUEST } from "../reducers/user";

const StyledForm = Styled(Form)`
    margin: 0 20px;
    border: 1px solid #d9d9d9;
    padding: 20px;
`;

const NicknameEdit = () => {
    const { me } = useSelector((state) => state.user);
    const [nickname, onChangeNickname] = useInput(me?.nickname || "");
    const dispatch = useDispatch();

    const onSubmit = useCallback(() => {
        dispatch({
            type: CHANGE_NICKNAME_REQUEST,
            data: nickname,
        });
    }, [nickname]);

    return (
        <>
            <StyledForm>
                <Input.Search value={nickname} onChange={onChangeNickname} addonBefore="닉네임" enterButton="수정" onSearch={onSubmit} />
            </StyledForm>
        </>
    );
};

export default NicknameEdit;
