import { Test, TestingModule } from '@nestjs/testing';
import { GmbService } from './gmb.service';

describe('GmbService', () => {
  let service: GmbService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GmbService],
    }).compile();

    service = module.get<GmbService>(GmbService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
