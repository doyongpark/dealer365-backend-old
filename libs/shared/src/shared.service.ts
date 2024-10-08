import { Injectable } from '@nestjs/common';

@Injectable()
export class SharedService {
    getData() {
        return `${this.constructor.name}`;
    }
}
