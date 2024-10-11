import { Test, TestingModule } from '@nestjs/testing';
import { CrmServiceService } from './crm-service.service';

describe('CrmServiceService', () => {
  let service: CrmServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CrmServiceService],
    }).compile();

    service = module.get<CrmServiceService>(CrmServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
