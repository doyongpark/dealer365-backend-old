import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateLeadDto {
    @Expose() @ApiPropertyOptional() @IsOptional() @IsString() firstName?: string;
    @Expose() @ApiProperty() @IsOptional() @IsString() fullName?: string;
    @Expose() @ApiPropertyOptional() @IsOptional() @IsString() comment?: string;
    @Expose() @ApiPropertyOptional() @IsOptional() @IsString() addresses?: string;
    @Expose() @ApiPropertyOptional() @IsOptional() @IsString() contacts?: string;
    @Expose() @ApiProperty() @IsOptional() @IsBoolean() isConvertedToContact?: boolean;
}