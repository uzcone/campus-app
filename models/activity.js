const Sequelize = require('sequelize');

module.exports = class Activity extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      role: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      period: {
        type: Sequelize.STRING(50),
        allowNull: false,
        defaultValue: '진행 중',
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'Activity',
      tableName: 'activities',
      paranoid: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    });
  }

  static associate(db) {
    db.Activity.belongsTo(db.User, { foreignKey: 'userId', targetKey: 'id' });
  }
};