import React from "react";
import { Form, Input } from "antd";
import Styled from "styled-components";

const StyledForm = Styled(Form)`
    margin: 0 20px;
    border: 1px solid #d9d9d9;
    padding: 20px;
`;

const NicknameEdit = () => {
    return (
        <>
            <StyledForm>
                <Input.Search addonBefore="닉네임" enterButton="수정" />
            </StyledForm>
        </>
    );
};

export default NicknameEdit;
