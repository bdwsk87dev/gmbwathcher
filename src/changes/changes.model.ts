import { Model, Table, DataType, Column, BelongsTo, ForeignKey } from "sequelize-typescript";
import { Location } from "../locations/locations.model"

interface ChangesCreationAttrs {
  name:string;
  value: string;
  newval: string;
}

@Table({ tableName: "changes" })
export class Change extends Model<Change, ChangesCreationAttrs> {
  @Column({type: DataType.INTEGER, unique: true, autoIncrement:true, primaryKey: true})
  id: number;

  @ForeignKey(()=> Location)
  @Column({ type: DataType.INTEGER})
  locationId: number;

  @Column({type: DataType.STRING})
  name: string;
  @Column({type: DataType.STRING})
  value: string;
  @Column({type: DataType.STRING})
  newVal: string;

  @BelongsTo(()=>Location)
  location:Location;
}