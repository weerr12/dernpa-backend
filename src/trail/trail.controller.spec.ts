import { Test, TestingModule } from '@nestjs/testing';
import { TrailController } from './trail.controller';
import { TrailService } from './trail.service';

describe('TrailController', () => {
  let controller: TrailController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TrailController],
      providers: [TrailService],
    }).compile();

    controller = module.get<TrailController>(TrailController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
