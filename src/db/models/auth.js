import bcrypt from 'bcryptjs';
import uuidv4 from 'uuid/v4';
import Sequelize from 'sequelize';

export default (sequelize, DataTypes) => {
  const Auth = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Username is required.'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Password is required.'
        }
      }
    },
    hash_id: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: 'Enter a valid email.'
        },
        notEmpty: {
          msg: 'Email is required.'
        }
      }
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

  Auth.findByEmail = (email) => Auth.findOne({
    where: {
      email
    }
  });

  Auth.findByUsername = (username) => Auth.findOne({
    where: {
      username
    }
  });

  Auth.findByUsernameOrEmail = (username, email) => Auth.findOne({
    where: {
      [Sequelize.Op.or]: [{ username }, { email }]
    }
  });

  return Auth;
};
