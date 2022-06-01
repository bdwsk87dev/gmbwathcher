import { Change } from "../changes/changes.model";
import { Location } from "./locations.model";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Sequelize, Op } from "sequelize";
import { CreateLocationDto } from "./dto/create-location.dto";

@Injectable()
export class LocationsService {

  /**
   *
   * @param locationRepository
   */
  constructor(@InjectModel(Location) private locationRepository: typeof Location) {
  }

  /**
   *
   * @param dto
   */
  async createLocation(dto: CreateLocationDto) {
    const location = await this.locationRepository.create(dto);
    return location;
  }

  /**
   *
   * @param pageSize
   * @param pageIndex
   * @param orderField
   * @param orderAsc
   * @param searchString
   * @param onlyChanged
   */
  async getLocations(pageSize = 15,
   pageIndex = 0,
   orderField='count',
   orderAsc='asc',
   searchString='',
   onlyChanged,
   dateRangeStart,
   dateRangeEnd
  )
  {
    onlyChanged = (onlyChanged.toLowerCase() === 'true');
    if(dateRangeStart === 'undefined' || dateRangeStart === '' ){
      let date = new Date();
      dateRangeStart = date.setDate(date.getDate() - 7);
      dateRangeStart = require('moment').utc(dateRangeStart).format('yyyy-MM-DD HH:mm:ss');
    }else{
      const [ month,day, year] = dateRangeStart.split('/');
      dateRangeStart = new Date(+year, month-1, +day);
      dateRangeStart = require('moment').utc(dateRangeStart).format('yyyy-MM-DD HH:mm:ss');
    }
    if(dateRangeEnd === 'undefined' || dateRangeEnd === ''){
      dateRangeEnd = new Date();
      dateRangeEnd = require('moment').utc(dateRangeEnd).format('yyyy-MM-DD HH:mm:ss');
    }
    else{
      const [ month,day, year] = dateRangeEnd.split('/');
      dateRangeEnd = new Date(+year, month-1, +day+1);
      dateRangeEnd = require('moment').utc(dateRangeEnd).format('yyyy-MM-DD HH:mm:ss');
    }
    const locations = await this.locationRepository.findAll(
      {
        where:{
          [Op.or]: [
            {name:{
                [Op.like]: '%'+searchString+'%'
              }},
            {title:{
                [Op.like]: '%'+searchString+'%'
              }},
            {primaryPhone:{
                [Op.like]: '%'+searchString+'%'
              }},
            {additionalPhones:{
                [Op.like]: '%'+searchString+'%'
              }},
            {administrativeArea:{
                [Op.like]: '%'+searchString+'%'
              }},
            {postalCode:{
                [Op.like]: '%'+searchString+'%'
              }},
            {locality:{
                [Op.like]: '%'+searchString+'%'
              }},
            {addressLines:{
                [Op.like]: '%'+searchString+'%'
              }}
          ],
          updatedAt: {
            [Op.between]: [dateRangeStart, dateRangeEnd],
          },
        },
        attributes: {
          include: [[Sequelize.literal("COUNT(DISTINCT(changes.id))"), "count"]],
          // include: [[Sequelize.literal("(CASE WHEN COUNT(DISTINCT(changes.id)) > 0 THEN COUNT(DISTINCT(changes.id)) ELSE NULL END)"),'count']]
        },
        include: [{
          model: Change, attributes: [],
          required:onlyChanged
        }],
        group: ['Location.id'],
        offset: ((pageIndex) * pageSize),
        limit: pageSize,
        order:[
          [orderField,orderAsc]
          ],
        subQuery:false
      }
    );
    return locations;
  }

  /**
   *
   * @param searchString
   * @param onlyChanged
   */
  async getCount(
    searchString='',
    onlyChanged,
    dateRangeStart,
    dateRangeEnd
  ){
    let lng = this.getLocations(9999999, 0, 'count', 'asc', searchString, onlyChanged, dateRangeStart, dateRangeEnd).then(location =>
      {
        return location.length;
      }
    );
    return lng;
  }

  /**
   *
   * @param name
   */
  async getLocationByName(name: string) {
    const location = await this.locationRepository.findOne({ where: { name } });
    return location;
  }

  /**
   *
   * @param name
   * @param dto
   */
  async getLocationByNameAndUpdate(name: string, dto: CreateLocationDto) {
    const location = await this.locationRepository.findOne({ where: { name } });
    if (!location) return false;
    location.update(dto);
    return location;
  }
}