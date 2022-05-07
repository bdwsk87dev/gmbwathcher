import { Test, TestingModule } from '@nestjs/testing';
import { GmbController } from './gmb.controller';

describe('GmbController', () => {
  let controller: GmbController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GmbController],
    }).compile();

    controller = module.get<GmbController>(GmbController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
