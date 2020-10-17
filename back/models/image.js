module.exports = (sequelize, DataTypes) => {
    const Image = sequelize.define(
        "Image",
        {
            // id는 자동으로 매겨짐.
            src: {
                type: DataTypes.STRING(200),
                allowNull: false,
            },
        },
        {
            charset: "utf8", // 한글 지원
            collate: "utf8_general_ci",
        }
    );
    Image.associate = (db) => {
        db.Image.belongsTo(db.Post);
    };

    return Image;
};
