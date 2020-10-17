// 백엔드의 역할: 프론트엔드로부터 요청이 들어오면 DB에서 데이터를 꺼내어 프론트로 전달

const express = require("express");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const morgan = require("morgan"); // 로그를 위한 라이브러리

const postRouter = require("./routes/post");
const postsRouter = require("./routes/posts");
const userRouter = require("./routes/user");
const db = require("./models");
const passportConfig = require("./passport"); // 패스포트 설정 파일 가져오기

const app = express();

passportConfig();

// sequelize와 연동하는 코드
db.sequelize
    .sync()
    .then(() => {
        console.log("db 연결 성공");
    })
    .catch(console.error);

// CORS 에러를 해결해주는 미들웨어(보안 정책 우회)
app.use(
    cors({
        origin: "http://localhost:3060", // credentials가 true일 때는 *가 되어선 안됨
        credentials: true, // 브라우저와 서버 간의 쿠키 전달을 위한 access-control-allow-credentials
    })
);
// 프론트로 부터 받은 json 형식 데이터를 req.body에 넣어주는 역할을 하는 미들웨어
app.use(express.json());

// 프론트로 부터 받은 form submit 형식 데이터를 req.body에 넣어주는 역할을 하는 미들웨어
app.use(express.urlencoded({ extended: true }));

// 시크릿을 이용해 쿠키를 만드는 미들웨어
app.use(cookieParser(""));

// 세션을 위한 미들웨어
app.use(session());

// 패스포트 미들웨어
app.use(passport.initialize());
app.use(
    passport.session({
        saveUninitialized: false,
        resave: false,
        secret: "", // 쿠키를 해독할 수 있게 하는 키
    })
);

// 로그를 위한 라이브러리
app.use(morgan("dev"));

// post.js의 라우터를 사용
app.use("/post", postRouter);

// posts.js
app.use("/posts", postsRouter);

// user.js의 라우터를 사용
app.use("/user", userRouter);

app.listen(3065, () => {
    console.log("서버 실행 중!");
});
