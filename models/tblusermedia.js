/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('tblusermedia', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    iduser: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    filename: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    createdby: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    createddate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    Type: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    poster: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    ispair: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: '0'
    }
  }, {
    tableName: 'tblusermedia'
  });
};
