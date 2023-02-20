import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/db';


interface UserAttributes {
  id: string;
  email: string;
  password: string;
}

class User extends Model<UserAttributes> implements UserAttributes {
  public id!: string;
  public email!: string;
  public password!: string;
}


User.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, validate: { isEmail: true, notEmpty: true } },
    password: { type: DataTypes.STRING }
  },
  {
    sequelize,
    modelName: 'user'
  }
);



export default User;