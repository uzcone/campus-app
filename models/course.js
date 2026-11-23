const Sequelize = require('sequelize');

module.exports = class Course extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      title: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      professor: {
        type: Sequelize.STRING(30),
        allowNull: false,
        defaultValue: '미정',
      },
      room: {
        type: Sequelize.STRING(30),
        allowNull: false,
        defaultValue: '미정',
      },
      credits: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 3,
      },
      semester: {
        type: Sequelize.STRING(20),
        allowNull: false,
        defaultValue: '2026-2',
      },
    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'Course',
      tableName: 'courses',
      paranoid: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    });
  }

  static associate(db) {
    db.Course.belongsTo(db.User, { foreignKey: 'userId', targetKey: 'id' });
  }
};