import { Test } from '@nestjs/testing';
import { Dealer365BackendTest1Service } from './test1.service';

describe('Dealer365BackendTest1Service', () => {
  let service: Dealer365BackendTest1Service;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [Dealer365BackendTest1Service],
    }).compile();

    service = module.get(Dealer365BackendTest1Service);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
