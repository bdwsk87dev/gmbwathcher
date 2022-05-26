import { Test, TestingModule } from '@nestjs/testing';
import { gmbController } from './gmb.controller';

describe('GmbController', () => {
  let controller: gmbController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [gmbController],
    }).compile();

    controller = module.get<gmbController>(gmbController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
