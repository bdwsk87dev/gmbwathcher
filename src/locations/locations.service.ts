import { Injectable } from "@nestjs/common";
import { Location } from "./locations.model";
import { InjectModel } from "@nestjs/sequelize";
import { CreateLocationDto } from "./dto/create-location.dto";

import { Change } from "../changes/changes.model";


import { Sequelize } from "sequelize"

@Injectable()
export class LocationsService {
  constructor(@InjectModel(Location) private locationRepository: typeof Location) {
  }

  async createLocation(dto: CreateLocationDto) {
    const location = await this.locationRepository.create(dto);
    return location;
  }

  async getLocations() {
    const locations = await this.locationRepository.findAll(
      {
        attributes: {
          include: [[Sequelize.literal("COUNT(DISTINCT(changes.id))"), "historyModelCount"]]
        },
        include: [{
          model: Change, attributes: []
        }],
        group: ['Location.id']
      }
    );
    return locations;
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