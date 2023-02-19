import { Sequelize } from 'sequelize';


const sequelize = new Sequelize(
  'speakupDB',
  "root",
  "#KanekiKen42",
  {
    host: "localhost",
    dialect: "mysql"
  }
);



export default sequelize;

