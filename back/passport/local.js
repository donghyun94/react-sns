const passport = require("passport");
const { Strategy: LocalStrategy } = require("passport-local");
const bcrypt = require("bcrypt");
const { User } = require("../models");

// 로컬 로그인(그냥 이메일과 패스워드로 로그인하는 방식) 전략
module.exports = () => {
    passport.use(
        new LocalStrategy(
            {
                usernameField: "email", // req.body.email
                passwordField: "password", // req.body.password
            },
            async (email, password, done) => {
                try {
                    const user = await User.findOne({
                        // 기존에 존재하는 이메일인지 찾기
                        where: { email: email },
                    });

                    // 계정이 존재하지 않는 경우
                    if (!user) {
                        // done(서버 에러, 성공, 클라이언트 에러)
                        return done(null, false, { reason: "존재하지 않는 사용자임ㅠㅠ" });
                    }

                    // 계정이 존재하는 경우, DB의 비밀번호와 입력한 비밀번호를 비교
                    const result = await bcrypt.compare(password, user.password);

                    // 로그인 성공
                    if (result) {
                        return done(null, user);
                    }

                    // 비밀번호 불일치
                    return done(null, false, { reason: "비밀번호가 틀림 ㅠㅠ" });
                } catch (error) {
                    // 서버 에러
                    console.error(error);
                    return done(error);
                }
            }
        )
    );
};
