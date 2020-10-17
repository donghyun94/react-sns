const DataTypes = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    // mysql에서는 users로 저장 됨.
    const Post = sequelize.define(
        "Post",
        {
            // id는 자동으로 매겨짐.
            content: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            // UserId
            // RetweetId
        },
        {
            charset: "utf8mb4", // 한글과 이모지 지원
            collate: "utf8mb4_general_ci",
        }
    );
    Post.associate = (db) => {
        // post.addUser, post.removeUser
        db.Post.belongsTo(db.User); // 게시물은 유저에 속해있음. belongsTo를 사용하면 유저의 아이디를 외래키로 가진다.
        // post.addComments, post.removeComments
        db.Post.hasMany(db.Comment); // 게시물과 코멘트는 1:n 관계
        // post.addImages
        db.Post.hasMany(db.Image);
        // post.addHashtags
        db.Post.belongsToMany(db.Hashtag, { through: "PostHashtag" }); // 포스트와 해쉬태그는 n:m 관계. through 이름의 연결 테이블이 따로 하나 생김 (through 필수)
        //post.addLikers, post.removeLikers
        db.Post.belongsToMany(db.User, { through: "Like", as: "Likers" }); // 포스트와 유저의 좋아요 관계는 n:m
        // post.addRetweet
        db.Post.belongsTo(db.Post, { as: "Retweet" }); // 한 게시글이 여러 곳에 리트윗될 수 있다
    };

    return Post;
};
