import { Injectable } from '@nestjs/common';

@Injectable()
export class DatabaseService {
    getData() {
        return `${this.constructor.name}`;
    }
}
