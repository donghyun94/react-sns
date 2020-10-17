const DataTypes = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    // mysql에서는 users로 저장 됨.
    const Comment = sequelize.define(
        "Comment",
        {
            // id는 자동으로 매겨짐.
            content: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
        },
        {
            charset: "utf8mb4", // 한글과 이모지 지원
            collate: "utf8mb4_general_ci",
        }
    );
    Comment.associate = (db) => {
        db.Comment.belongsTo(db.User);
        db.Comment.belongsTo(db.Post);
    };

    return Comment;
};
