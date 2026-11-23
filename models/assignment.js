const Sequelize = require('sequelize');

module.exports = class Assignment extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      courseTitle: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      dueDate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      isCompleted: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'Assignment',
      tableName: 'assignments',
      paranoid: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    });
  }

  static associate(db) {
    db.Assignment.belongsTo(db.User, { foreignKey: 'userId', targetKey: 'id' });
  }
};