import { Test, TestingModule } from '@nestjs/testing';
import { ApiSaleController } from './api-sale.controller';
import { ApiSaleService } from './api-sale.service';

describe('ApiSaleController', () => {
  let apiSaleController: ApiSaleController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ApiSaleController],
      providers: [ApiSaleService],
    }).compile();

    apiSaleController = app.get<ApiSaleController>(ApiSaleController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(apiSaleController.getHello()).toBe('Hello World!');
    });
  });
});
