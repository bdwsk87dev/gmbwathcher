import { Injectable } from '@nestjs/common';
import { CreateChangeDto } from "../changes/dto/create-change.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Change } from "./changes.model";

@Injectable()
export class ChangesService {
  constructor(@InjectModel(Change) private changeRepository: typeof Change) {}
  async createChange(dto: CreateChangeDto){
    const change = await this.changeRepository.create(dto);
    return change;
  }
}




