import { Test } from '@nestjs/testing';
import { Dealer365BackendTest2Service } from './test2.service';

describe('Dealer365BackendTest2Service', () => {
  let service: Dealer365BackendTest2Service;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [Dealer365BackendTest2Service],
    }).compile();

    service = module.get(Dealer365BackendTest2Service);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
