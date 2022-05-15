import { Injectable } from "@nestjs/common";
import { Location } from "./locations.model";
import { InjectModel } from "@nestjs/sequelize";
import { CreateLocationDto } from "./dto/create-location.dto";

@Injectable()
export class LocationsService{
  constructor(@InjectModel(Location) private locationRepository: typeof Location) {

  }
  async createLocation(dto: CreateLocationDto){
    const location = await this.locationRepository.create(dto);
    return location;
  }
  async getLocations() {
    const locations = await this.locationRepository.findAll();
    return locations;
  }
  async getLocationByName(name: string){
    const location = await this.locationRepository.findOne({where: {name}})
    return location;
  }
  async getLocationByNameAndUpdate(name: string, dto: CreateLocationDto){
    const location = await this.locationRepository.findOne({where: {name}})
    if(!location)return false;
    location.update(dto)
    return location;
  }
}