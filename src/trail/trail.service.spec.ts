import { Test, TestingModule } from '@nestjs/testing';
import { TrailService } from './trail.service';

describe('TrailService', () => {
  let service: TrailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrailService],
    }).compile();

    service = module.get<TrailService>(TrailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
