module.exports = (sequelize, DataTypes) => {
    // mysql에서는 users로 저장 됨.
    const User = sequelize.define(
        "User",
        {
            // id는 자동으로 매겨짐.
            email: {
                type: DataTypes.STRING(50),
                allowNull: false, // 필수!
                unique: true, // 고유한 값
            },
            nickname: {
                type: DataTypes.STRING(30),
                allowNull: false, // 필수!
            },
            password: {
                type: DataTypes.STRING(100),
                allowNull: false, // 필수!
            },
        },
        {
            charset: "utf8", // 한글 지원
            collate: "utf8_general_ci",
        }
    );
    User.associate = (db) => {
        db.User.hasMany(db.Post); // 유저와 포스트는 1 대 다 관계 /
        db.User.hasMany(db.Comment); // 유저와 댓글은 1 대 다 관계 /
        db.User.belongsToMany(db.Post, { through: "Like", as: "Liked" }); // 유저와 포스트 좋아요의 관계는 다 대 다
        // foreignKey는 연결 테이블의 컬럼에 사용 됨.
        db.User.belongsToMany(db.User, { through: "Follow", as: "Followers", foreignKey: "FollowingId" }); // 팔로우 당하는 유저
        db.User.belongsToMany(db.User, { through: "Follow", as: "Followings", foreignKey: "FollowerId" }); // 팔로우 하는 유저
    };

    return User;
};
