import { Module } from '@nestjs/common';
import { gmbController } from './gmb.controller';

@Module({
  controllers: [gmbController]
})
export class GmbModule {}
