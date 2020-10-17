// 로그인되지 않은 유저가 접근할 때를 대비한 미들웨어
exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        next(); // next 괄호 안에 아무것도 없다면 그냥 다음 미들웨어로 간다는 뜻
    } else {
        res.status(401).send("로그인이 필요합니다.");
    }
};

// 로그인이 되어있지 않아야 할 때를 대비한 미들웨어
exports.isNotLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        next();
    } else {
        res.status(401).send("로그인 하지 않은 사용자만 접근 가능합니다.");
    }
};
