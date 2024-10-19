import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { LIMIT } from '../../constants';
import { PaginationRequestDto } from '../shared';

export class SearchLeadsDto extends PaginationRequestDto(LIMIT.DEFAULT, LIMIT.MAX) {
    @ApiPropertyOptional() @IsOptional() @IsString() lastName?: string;
}
