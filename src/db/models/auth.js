import bcrypt from 'bcryptjs';
import uuidv4 from 'uuid/v4';

export default (sequelize, DataTypes) => {
  const Auth = sequelize.define('User', {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Username is required'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Password is required'
        }
      }
    },
    hash_id: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    hooks: {
      beforeCreate: (user) => {
        user.id = uuidv4();
        user.hash_id = bcrypt.hashSync(uuidv4(), 4);
      },
      beforeSave: (user) => {
        if (user.changed('password')) {
          const salt = bcrypt.genSaltSync(10);
          user.password = bcrypt.hashSync(user.password, salt);
        }
      }
    },
    timestamps: true
  });
  Auth.findByHashId = (hash_id) => Auth.findOne({
    where: {
      hash_id
    }
  });

  return Auth;
};
