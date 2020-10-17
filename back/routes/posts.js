//posts는 게시물을 여러 개 가져오기 위한 라우터

const express = require("express");
const { Post, User, Image, Comment } = require("../models");

const router = express.Router();

//GET /posts
router.get("/", async (req, res, next) => {
    try {
        const posts = await Post.findAll({
            limit: 10,
            order: [
                ["createdAt", "DESC"], // Post order by createdAt(내림차순)
                [Comment, "createdAt", "DESC"], // 관계 있는 코멘트 테이블을 가져올때도 정렬을 시킨다
            ],
            include: [
                {
                    model: User, // 작성자의 정보
                    attributes: ["id", "nickname"],
                },
                { model: Image },
                {
                    model: Comment, // 댓글과 댓글 작성자 가져오기
                    include: [{ model: User, attributes: ["id", "nickname"] }],
                },
                {
                    model: User, // 좋아요 누른 사람
                    as: "Likers",
                    attributes: ["id"],
                },
            ],
        });
        res.status(200).json(posts);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;
