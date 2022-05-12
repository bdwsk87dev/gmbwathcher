import { Column, DataType, Model, Table } from "sequelize-typescript";

interface GmbaccountCreationAttrs {
  userId: number;
  name: string;
}

@Table({tableName: 'gmbaccount'})
export class GmbAccount extends Model<GmbAccount>{
  @Column({type: DataType.INTEGER, unique: true, autoIncrement:true, primaryKey: true})
  id: number;
  @Column({type: DataType.INTEGER})
  userId: number;
  @Column({type: DataType.STRING})
  name: string;
}