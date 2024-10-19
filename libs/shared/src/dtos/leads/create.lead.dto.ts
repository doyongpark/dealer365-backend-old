import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsDefined, IsOptional, IsString } from 'class-validator';

export class CreateLeadDto {
    @Expose() @ApiPropertyOptional() @IsOptional() @IsString() firstName?: string;
    @Expose() @ApiProperty() @IsDefined() @IsString() lastName: string;
    @Expose() @ApiProperty() @IsOptional() @IsString() fullName?: string;
    @Expose() @ApiPropertyOptional() @IsOptional() @IsString() comment?: string;
    @Expose() @ApiPropertyOptional() @IsOptional() @IsString() addresses?: string;
    @Expose() @ApiPropertyOptional() @IsOptional() @IsString() contacts?: string;
}