import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js';
import User from './User.js';

class Tache extends Model {}

Tache.init(
  {
    titre: { 
      type: DataTypes.STRING,
      allowNull: false,
    },
    terminee: { 
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    
    UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    }
  },
  {
    sequelize,
    modelName: 'Tache', 
  },
);


User.hasMany(Tache, { onDelete: 'CASCADE' });
Tache.belongsTo(User);

export default Tache;