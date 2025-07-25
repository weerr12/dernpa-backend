import { Test, TestingModule } from '@nestjs/testing';
import { ParkService } from './park.service';

describe('ParkService', () => {
  let service: ParkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParkService],
    }).compile();

    service = module.get<ParkService>(ParkService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
