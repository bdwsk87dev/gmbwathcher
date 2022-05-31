import { Injectable } from "@nestjs/common";
import { Location } from "./locations.model";
import { InjectModel } from "@nestjs/sequelize";
import { CreateLocationDto } from "./dto/create-location.dto";
import { Change } from "../changes/changes.model";
import { Sequelize, Op } from "sequelize"

@Injectable()
export class LocationsService {
  constructor(@InjectModel(Location) private locationRepository: typeof Location) {
  }

  async createLocation(dto: CreateLocationDto) {
    const location = await this.locationRepository.create(dto);
    return location;
  }

  async getLocations(
    pageSize = 15,
    pageIndex = 0,
    orderField='count',
    orderAsc='asc',
    searchString='',
    onlyChanged=false
  )
  {
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
          ]
        },

        attributes: {
          include: [[Sequelize.literal("COUNT(DISTINCT(changes.id))"), "count"]]
        },
        include: [{
          model: Change, attributes: []
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

  async getCount(searchString='', onlyChanged=false){
    return await this.locationRepository.count({
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
        ]
      },
    });
  }

  async getLocationByName(name: string) {
    const location = await this.locationRepository.findOne({ where: { name } });
    return location;
  }

  async getLocationByNameAndUpdate(name: string, dto: CreateLocationDto) {
    const location = await this.locationRepository.findOne({ where: { name } });
    if (!location) return false;
    location.update(dto);
    return location;
  }
}