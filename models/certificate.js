const Sequelize = require('sequelize');

module.exports = class Certificate extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      title: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      issuer: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      score: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      issueDate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'Certificate',
      tableName: 'certificates',
      paranoid: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    });
  }

  static associate(db) {
    db.Certificate.belongsTo(db.User, { foreignKey: 'userId', targetKey: 'id' });
  }
};