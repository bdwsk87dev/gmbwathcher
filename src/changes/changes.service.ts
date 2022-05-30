import { Injectable } from '@nestjs/common';
import { CreateChangeDto } from "../changes/dto/create-change.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Change } from "./changes.model";
import { LocationsService } from "../locations/locations.service";

@Injectable()
export class ChangesService {
  constructor(@InjectModel(Change) private changeRepository: typeof Change,
              private locationsService: LocationsService) {}
  async createChange(dto: CreateChangeDto){
    const change = await this.changeRepository.create(dto);
    return change;
  }
  async getLocationChanges(name: string){
    const location = await this.locationsService.getLocationByName("locations/"+name);
    if(location === null) return null
    const changes = await this.changeRepository.findAll({
      where: {locationId:location.id},
      include:
        [{
          all:true
        }]
    })
    return changes;
  }
}
