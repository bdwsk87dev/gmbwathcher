import { Test, TestingModule } from '@nestjs/testing';
import { ChangesController } from './changes.controller';

describe('ChangesController', () => {
  let controller: ChangesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChangesController],
    }).compile();

    controller = module.get<ChangesController>(ChangesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
