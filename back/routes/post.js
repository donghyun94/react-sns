const express = require("express");

const { Post, Comment, Image, User } = require("../models");
const { isLoggedIn } = require("./middlewares"); // 로그인 상태를 확인하는 미들웨어
const router = express.Router();

// 게시물을 작성하는 POST /post
// 라우터를 이용하기 때문에 실제로는 /post 이다
router.post("/", isLoggedIn, async (req, res, next) => {
    try {
        // 게시물의 기본적인 정보
        const post = await Post.create({
            content: req.body.content, // DB의 Post 테이블에 생성
            UserId: req.user.id, // 게시글을 작성한 유저
        });

        // 게시물의 여러 데이터들을 함께 가져온다
        const fullPost = await Post.findOne({
            where: { id: post.id },
            include: [
                {
                    model: Image,
                },
                {
                    model: Comment,
                    include: [{ model: User, attributes: ["id", "nickname"] }], // 댓글 작성자
                },
                {
                    model: User, // 게시물 작성자
                    attributes: ["id", "nickname"],
                },
                {
                    model: User, // 좋아요 누른 사람
                    as: "Likers",
                    attributes: ["id"],
                },
            ],
        });

        res.status(201).json(fullPost);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.delete("/:postId", isLoggedIn, async (req, res, next) => {
    try {
        await Post.destroy({
            where: {
                id: req.params.postId, // 해당 아이디의 게시물 제거
                UserId: req.user.id, // 내가 쓴 게시글
            },
        });
        res.status(200).json({ PostId: parseInt(req.params.postId) });
    } catch (error) {
        console.error(error);
        next(error);
    }
});

// POST /post/게시글 번호/comment
//: 뒤에 변수명을 쓰면 req.params.변수명으로 접근이 가능하다.
router.post("/:postId/comment", isLoggedIn, async (req, res, next) => {
    try {
        const post = await Post.findOne({
            where: { id: req.params.postId },
        });

        // 해당 아이디의 게시물이 존재하는지 확인
        if (!post) {
            return res.status(403).send("존재하지 않는 게시물입니다.");
        }

        const comment = await Comment.create({
            content: req.body.content, // DB의 Post 테이블에 생성
            PostId: parseInt(req.params.postId), // :postId (postId는 문자열이라서 숫자로 바꿔야 함)
            UserId: req.user.id, // 코멘트를 작성한 유저
        });

        // 댓글 작성자의 정보도 가져오기
        const fullComment = await Comment.findOne({
            where: { id: comment.id },
            include: [
                {
                    model: User,
                    attributes: ["id", "nickname"],
                },
            ],
        });

        res.status(201).json(fullComment);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

// 게시물 좋아요
// PATCH /post/번호/like
router.patch("/:postId/like", async (req, res, next) => {
    try {
        const post = await Post.findOne({ where: { id: req.params.postId } });
        if (!post) {
            return res.status(403).send("게시글이 존재하지 않습니다.");
        }
        await post.addLikers(req.user.id); // sequelize가 자동으로 생성해주는 addLikers 함수를 사용
        res.json({ PostId: post.id, UserId: req.user.id });
    } catch (error) {
        console.error(error);
        next(error);
    }
});

// 게시물 좋아요 취소
// DELETE /post/번호/like
router.delete("/:postId/like", async (req, res, next) => {
    try {
        const post = await Post.findOne({ where: { id: req.params.postId } });
        if (!post) {
            return res.status(403).send("게시글이 존재하지 않습니다.");
        }
        await post.removeLikers(req.user.id); // sequelize가 자동으로 생성해주는 removeLikers 함수를 사용
        res.json({ PostId: post.id, UserId: req.user.id });
    } catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;
