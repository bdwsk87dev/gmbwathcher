import { Test, TestingModule } from '@nestjs/testing';
import { GmbaccountsController } from './gmbaccounts.controller';

describe('GmbaccountsController', () => {
  let controller: GmbaccountsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GmbaccountsController],
    }).compile();

    controller = module.get<GmbaccountsController>(GmbaccountsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
