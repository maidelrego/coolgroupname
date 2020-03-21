module.exports = function (sequelize, DataTypes) {
  var Symptoms = sequelize.define('Symptoms', {
    fever: {
      type: DataTypes.STRING
    },
    cough: {
      type: DataTypes.STRING
    },
    breath: {
      type: DataTypes.STRING
    },
    blueFace: {
      type: DataTypes.STRING
    }
  })
  return Symptoms
}
