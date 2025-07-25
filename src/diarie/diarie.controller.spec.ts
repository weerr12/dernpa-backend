import { Test, TestingModule } from '@nestjs/testing';
import { DiarieController } from './diarie.controller';
import { DiarieService } from './diarie.service';

describe('DiarieController', () => {
  let controller: DiarieController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DiarieController],
      providers: [DiarieService],
    }).compile();

    controller = module.get<DiarieController>(DiarieController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
