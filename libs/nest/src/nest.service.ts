import { Injectable } from '@nestjs/common';

@Injectable()
export class NestService {
    getData() {
        return `${this.constructor.name}`;
    }
}

