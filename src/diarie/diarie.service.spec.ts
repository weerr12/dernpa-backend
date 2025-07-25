import { Test, TestingModule } from '@nestjs/testing';
import { DiarieService } from './diarie.service';

describe('DiarieService', () => {
  let service: DiarieService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DiarieService],
    }).compile();

    service = module.get<DiarieService>(DiarieService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
