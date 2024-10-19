import { IRepository } from '@dealer365-backend/database';
import { MongoRepository } from '@dealer365-backend/database/impl';
import { Lead } from '@dealer365-backend/shared';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CustomLeadRepository extends MongoRepository<Lead> implements IRepository<Lead> {   

}