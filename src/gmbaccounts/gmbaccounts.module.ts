import { Module } from '@nestjs/common';
import { GmbaccountsController } from './gmbaccounts.controller';

@Module({
  controllers: [GmbaccountsController]
})
export class GmbaccountsModule {}
