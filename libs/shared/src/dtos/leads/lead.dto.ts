import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsBoolean, IsDefined, IsNumber, IsOptional, IsString } from 'class-validator';
import { BaseDto } from '../../dtos';

export class LeadDto extends BaseDto {
    @Expose() @ApiPropertyOptional() @IsOptional() @IsString() firstName?: string;
    @Expose() @ApiProperty() @IsDefined() @IsString() lastName: string;
    @Expose() @ApiProperty() @IsOptional() @IsString() fullName?: string;
    @Expose() @ApiPropertyOptional() @IsOptional() @IsString() comment?: string;
    @Expose() @ApiPropertyOptional() @IsOptional() @IsNumber() leadScore?: number;
    @Expose() @ApiPropertyOptional() @IsOptional() @IsString() addresses?: string;
    @Expose() @ApiPropertyOptional() @IsOptional() @IsString() contacts?: string;
    @Expose() @ApiProperty() @IsOptional() @IsBoolean() isConvertedToContact?: boolean;
}
