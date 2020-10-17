const passport = require("passport");
const local = require("./local");
const { User } = require("../models");

module.exports = () => {
    // 세션에 쓰이는 메모리를 아끼기 위해 모든 정보를 저장하는 대신 유저의 아이디만 저장한다.
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    // 위에서 저장한 유저의 아이디를 통해 필요할 때마다 DB에서 유저의 정보를 찾는다.
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findOne({ where: id });
            done(null, user); // req.user에 유저의 로그인 데이터 넣어줌
        } catch (error) {
            console.error(error);
            done(error);
        }
    });

    local();
};
