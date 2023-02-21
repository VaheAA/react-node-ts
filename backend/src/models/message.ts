import { DataTypes } from 'sequelize';
import sequelize from '../db/db';

const Message = sequelize.define('message', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING, validate: { isEmail: true, notEmpty: true } },
  phone: { type: DataTypes.STRING },
  category: { type: DataTypes.STRING },
  status: { type: DataTypes.STRING },
  period: { type: DataTypes.STRING },
  date: { type: DataTypes.STRING },
  witness: { type: DataTypes.STRING },
  message: { type: DataTypes.TEXT },
  filePath: { type: DataTypes.STRING },
}
);

export default Message;