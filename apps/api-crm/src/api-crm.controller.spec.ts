import { Test, TestingModule } from '@nestjs/testing';
import { ApiCrmController } from './api-crm.controller';
import { ApiCrmService } from './api-crm.service';

describe('ApiCrmController', () => {
  let apiCrmController: ApiCrmController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ApiCrmController],
      providers: [ApiCrmService],
    }).compile();

    apiCrmController = app.get<ApiCrmController>(ApiCrmController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(apiCrmController.getHello()).toBe('Hello World!');
    });
  });
});
