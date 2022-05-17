import { Model, Table, DataType, Column, BelongsTo, HasMany } from "sequelize-typescript";
import { Change } from "../changes/changes.model";

interface LocationCreationAttrs {
  name:string;
  gmbaccountId: number;
  languageCode: string;
  storeCode: string;
  title: string;
  primaryPhone: string;
  additionalPhones: string;
  regionCode: string;
  administrativeArea: string;
  postalCode: string;
  locality: string;
  addressLines: string;
  websiteUri: string;
  latlng: string;
  mapsUri: string;
}

@Table({ tableName: "locations" })
export class Location extends Model<Location, LocationCreationAttrs> {
  @Column({type: DataType.INTEGER, unique: true, autoIncrement:true, primaryKey: true})
  id: number;
  @Column({type: DataType.INTEGER})
  gmbaccountId: number;
  @Column({type: DataType.STRING})
  name: string;
  @Column({type: DataType.STRING})
  languageCode: string;
  @Column({type: DataType.STRING})
  storeCode: string;
  @Column({type: DataType.STRING})
  title: string;
  @Column({type: DataType.STRING})
  primaryPhone: string;
  @Column({type: DataType.STRING})
  additionalPhones: string;
  @Column({type: DataType.STRING})
  regionCode: string;
  @Column({type: DataType.STRING})
  administrativeArea: string;
  @Column({type: DataType.STRING})
  postalCode: string;
  @Column({type: DataType.STRING})
  locality: string;
  @Column({type: DataType.STRING})
  addressLines: string;
  @Column({type: DataType.STRING})
  websiteUri: string;
  @Column({type: DataType.STRING})
  latlng: string;
  @Column({type: DataType.STRING})
  mapsUri: string;

  @HasMany(()=>Change)
  changes: Change[]
}