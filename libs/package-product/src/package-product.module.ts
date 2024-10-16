import { Module } from '@nestjs/common';
import { PackageProductService } from './package-product.service';

@Module({
  providers: [PackageProductService],
  exports: [PackageProductService],
})
export class PackageProductModule {}
