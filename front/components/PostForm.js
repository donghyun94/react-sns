import React, { useRef, useCallback, useState, useEffect } from "react";
import { Form, Input, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { addPostAction } from "../reducers/post";

const PostForm = () => {
    const { imagePaths, postAdded } = useSelector((state) => state.post);
    const [text, setText] = useState("");
    const dispatch = useDispatch();
    const imageInput = useRef();

    const onClickImageUpload = useCallback(() => {
        imageInput.current.click();
    }, [imageInput.current]);

    useEffect(() => {
        if (postAdded) {
            setText("");
        }
    }, [postAdded]);

    const onChangeText = useCallback((e) => {
        setText(e.target.value);
    }, []);

    const onSubmit = useCallback(() => {
        dispatch(addPostAction());
        setText("");
    }, []);

    return (
        <Form style={{ margin: "10px 0 20px" }} encType="multipart/form-data" onFinish={onSubmit}>
            <Input.TextArea value={text} onChange={onChangeText} maxLength={140} placeholder="어떤 신기한 일이 있었나요?" />
            <div>
                {/* 파일 업로드를 위한 창을 띄우게 하기 위한 input[type=file] */}
                <input type="file" multiple hidden ref={imageInput} />
                <Button onClick={onClickImageUpload}>이미지 업로드</Button>
                <Button type="primary" style={{ float: "right" }} htmlType="submit">
                    짹짹
                </Button>
            </div>
            <div>
                {imagePaths.map((v) => {
                    return (
                        <div key={v} style={{ display: "inline-block" }}>
                            <img src={"http://localhost:3065/" + v} style={{ width: "200px" }} alt={v} />
                            <div>
                                <Button>제거</Button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </Form>
    );
};

export default PostForm;
