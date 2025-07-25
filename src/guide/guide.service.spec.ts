import { Test, TestingModule } from '@nestjs/testing';
import { GuideService } from './guide.service';

describe('GuideService', () => {
  let service: GuideService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GuideService],
    }).compile();

    service = module.get<GuideService>(GuideService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
