import React from "react";
import Head from "next/head";
import wrapper from "../store/configureStore";
import withReduxSaga from "next-redux-saga";

import "antd/dist/antd.css";

// _app.js는 모든 페이지들의 공통적인 부분을 담당한다. 따라서 모든 페이지의 부모인 셈. css파일을 임포트하면 모든 페이지에 적용됨.
const App = ({ Component }) => {
    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <title>NodeBird</title>
            </Head>
            <Component />
        </>
    );
};

export default wrapper.withRedux(withReduxSaga(App));
