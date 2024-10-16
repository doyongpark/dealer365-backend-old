import { LIMIT, PaginationRequestDto } from '@dealer365-backend/shared';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class SearchLeadsDto extends PaginationRequestDto(LIMIT.DEFAULT, LIMIT.MAX) {
    @ApiPropertyOptional() @IsOptional() @IsString() lastName?: string;
}
