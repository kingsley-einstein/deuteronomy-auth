export default (sequelize, DataTypes) => {
  const Blacklist = sequelize.define('blacklist', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    token: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  });

  Blacklist.findByToken = (token) => Blacklist.findOne({
    where: {
      token
    }
  });

  return Blacklist;
};
