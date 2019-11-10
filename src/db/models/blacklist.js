export default (sequelize, DataTypes) => {
  const Blacklist = sequelize.define('blacklist', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  Blacklist.findByToken = (token) => Blacklist.findOne({
    where: {
      token
    }
  });
};
