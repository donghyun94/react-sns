const DataTypes = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Hashtag = sequelize.define(
        "Hashtag",
        {
            // id는 자동으로 매겨짐.
            name: {
                type: DataTypes.STRING(20),
                allowNull: false,
            },
        },
        {
            charset: "utf8mb4", // 한글과 이모지 지원
            collate: "utf8mb4_general_ci",
        }
    );
    Hashtag.associate = (db) => {
        db.Hashtag.belongsToMany(db.Post, { through: "PostHashtag" }); // 다대 다 관계. through는 연결테이블 이름 (필수)
    };

    return Hashtag;
};
