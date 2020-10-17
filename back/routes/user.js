const express = require("express");
const bcrypt = require("bcrypt"); // 비밀번호 암호화 라이브러리
const passport = require("passport");

const { isLoggedIn, isNotLoggedIn } = require("./middlewares");
const { User, Post } = require("../models"); // db.User, db.Post

const router = express.Router();

// 유저의 정보를 가져오는 GET /user
router.get("/", async (req, res, next) => {
    try {
        // 로그인 상태일 때만 정보를 가져온다.
        if (req.user) {
            const fullUserWithoutPassword = await User.findOne({
                where: { id: req.user.id },

                // 해당하는 데이터들만 골라서 가져온다. (비밀번호는 제외)
                attributes: { exclude: ["password"] },

                // DB에서 유저와 관계를 형성하는 테이블 데이터들을 함께 가져온다.
                include: [
                    { model: Post, attributes: ["id"] }, // 게시물의 내용 전부를 가져올 필요는 없으므로 아이디만 가져옴.
                    { model: User, as: "Followings" },
                    { model: User, as: "Followers" },
                ],
            });

            return res.status(200).json(fullUserWithoutPassword); // 로그인한 유저 데이터를 다시 saga로 보내줌
        } else {
            res.status(200).json(null);
        }
    } catch (error) {
        console.error(error);
        next(error);
    }
});

// 라우터를 이용하기 때문에 실제로는 /user 이다
// (req, res, next)를 포함한 함수가 바로 미들웨어이다.
router.post("/", async (req, res, next) => {
    try {
        // 기존의 데이터베이스에 요청한 이메일이 이미 존재하는지 찾기
        const exUser = await User.findOne({
            where: { email: req.body.email },
        });

        if (exUser) {
            // 403: 실패의 의미를 가지는 코드
            return res.status(403).send("이미 사용중인 이메일 입니다."); // 괄호 안의 메세지가 saga의 err.response.data
        }

        // 비밀번호 암호화(해쉬화)
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        // db에 유저 정보를 생성!
        // saga에서 post로 받은 데이터가 req.body로 들어온다.
        await User.create({
            email: req.body.email,
            nickname: req.body.nickname,
            password: hashedPassword,
        });
        // 201: 성공적인 응답 및 새로운 데이터 생성
        res.status(201).send("ok");
    } catch (error) {
        console.error(error);
        next(error); // status 500
    }
});

// POST /user/login
// saga로부터 로그인 데이터를 req에 전달받는다.
router.post("/login", isNotLoggedIn, (req, res, next) => {
    // 패스포트를 이용한 로그인
    passport.authenticate("local", (err, user, info) => {
        // 서버 에러
        if (err) {
            console.error(err);
            return next(err);
        }
        // 클라이언트 에러
        if (info) {
            return res.status(401).send(info.reason); // 401: 허가되지 않음
        }
        // 로그인 성공
        return req.login(user, async (loginErr) => {
            if (loginErr) {
                // 만약 패스포트 에러가 발생하면
                console.error(loginErr);
                return next(loginErr);
            }

            const fullUserWithoutPassword = await User.findOne({
                where: { id: user.id },
                // 해당하는 데이터들만 골라서 가져온다. (비밀번호는 제외)
                attributes: { exclude: ["password"] },
                // DB에서 유저와 관계있는 데이터들을 함께 가져온다.
                include: [{ model: Post }, { model: User, as: "Followings" }, { model: User, as: "Followers" }],
            });

            return res.status(200).json(fullUserWithoutPassword); // 로그인한 유저 데이터를 다시 saga로 보내줌
        });
    })(req, res, next);
});

// POST /user/logout
router.post("/logout", isLoggedIn, (req, res) => {
    req.logout();
    req.session.destroy(); // 세션에 있는 로그인 데이터를 지움
    res.send("ok");
});

router.patch("/nickname", isLoggedIn, async (req, res, next) => {
    try {
        await User.update(
            {
                nickname: req.body.nickname, // 프론트에서 받은 데이터로 닉네임 수정
            },
            { where: { id: req.user.id } } // 나의 아이디
        );
        res.status(200).json({ nickname: req.body.nickname });
    } catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;
