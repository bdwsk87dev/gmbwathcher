import { Column, DataType, Model, Table } from "sequelize-typescript";

interface UserCreationAttr {
  username: string;
  password: string;
}

@Table({tableName:'users'})
export class User extends Model<User, UserCreationAttr>{

  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

  @Column({type: DataType.STRING, unique: true, allowNull: false})
  username: string;

  @Column({type: DataType.STRING, allowNull: false})
  password: string;
}