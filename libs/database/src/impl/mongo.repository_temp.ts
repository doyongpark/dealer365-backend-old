/* eslint-disable @typescript-eslint/no-explicit-any */
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { FilterQuery, Model, ProjectionType, QueryOptions, Types, UpdateQuery } from 'mongoose';

export class IMongoRepository<T_Model, T_Entity> {
  public _model: Model<T_Model>;

  constructor(protected model: Model<T_Model>, protected entity: ClassConstructor<T_Entity>) {
    this._model = model;
  }

  createObjectId() {
    return new Types.ObjectId().toString();
  }

  isInternalId(id: string) {
    const isValidMongoId = Types.ObjectId.isValid(id);
    if (!isValidMongoId) {
      return false;
    }

    return id === new Types.ObjectId(id).toString();
  }

  convertObjectIdToString(value: Types.ObjectId): string {
    return value.toString();
  }

  convertStringToObjectId(value: string): Types.ObjectId {
    return new Types.ObjectId(value);
  }

  async count(query: FilterQuery<T_Model>, limit?: number): Promise<number> {
    return this.model.countDocuments(query, {
      limit,
    });
  }

  async aggregate(query: any[], options: { readPreference?: 'secondaryPreferred' | 'primary' } = {}): Promise<any> {
    return await this.model.aggregate(query).read(options.readPreference || 'primary');
  }

  async aggregateWithVirtuals(query: any[], options: { readPreference?: 'secondaryPreferred' | 'primary' } = {}): Promise<any> {
    return this.mapEntities(await this.model.aggregate(query).read(options.readPreference || 'primary'));
  }

  async findOne(
    query: FilterQuery<T_Model>,
    select?: ProjectionType<T_Entity>,
    options: { readPreference?: 'secondaryPreferred' | 'primary'; query?: QueryOptions<T_Model> } = {}
  ): Promise<T_Entity | null> {
    const data = await this.model.findOne(query, select, options.query).read(
      options.readPreference || 'primary'
    );
    if (!data) return null;

    return this.mapEntity(data.toObject());
  }

  async delete(query: FilterQuery<T_Model>): Promise<{
    /** Indicates whether this writes result was acknowledged. If not, then all other members of this result will be undefined. */
    acknowledged: boolean;
    /** The number of documents that were deleted */
    deletedCount: number;
  }> {
    return await this.model.deleteMany(query);
  }

  async find(
    query: FilterQuery<T_Model>,
    select: ProjectionType<T_Entity> = '',
    options: { limit?: number; sort?: any; skip?: number } = {}
  ): Promise<T_Entity[]> {
    const data = await this.model.find(query, select, {
      sort: options.sort || null,
    })
      .skip(options.skip as number)
      .limit(options.limit as number)
      //.lean() // TBD : https://waservice.inventis.co.kr/browse/D3API-309
      .exec();

    return this.mapEntities(data);
  }

  async findAll(options: { limit?: number; sort?: any; skip?: number, search?: any } = {}): Promise<T_Entity[]> {
    const data = await this.model.find()
      .skip(options.skip as number)
      .limit(options.limit as number)
      //.lean() // TBD : https://waservice.inventis.co.kr/browse/D3API-309
      .exec();

    return this.mapEntities(data);
  }

  async *findBatch(
    query: FilterQuery<T_Model>,
    select = '',
    options: { limit?: number; sort?: any; skip?: number } = {},
    batchSize = 500
  ) {
    for await (const doc of this._model
      .find(query, select, {
        sort: options.sort || null,
      })
      .batchSize(batchSize)
      .cursor()) {
      yield this.mapEntity(doc);
    }
  }

  async create(data: FilterQuery<T_Model>, options: { writeConcern?: number | 'majority'; } = {}): Promise<T_Entity> {
    const newEntity = new this.model(data);

    const saveOptions = options?.writeConcern ? { w: options?.writeConcern } : {};

    const saved = await newEntity.save(saveOptions);

    return this.mapEntity(saved);
  }

  async insertMany(
    data: FilterQuery<T_Model>[],
    ordered = false
  ): Promise<{ acknowledged: boolean; insertedCount: number; insertedIds: Types.ObjectId[] }> {
    let result;
    try {
      result = await this.model.insertMany(data, { ordered });
    } catch (e) {
      throw new Error(e.message);
    }

    const insertedIds = result.map((inserted) => inserted._id);

    return {
      acknowledged: true,
      insertedCount: result.length,
      insertedIds,
    };
  }

  async update(
    query: FilterQuery<T_Model>,
    updateBody: UpdateQuery<T_Model>
  ): Promise<{
    matched: number;
    modified: number;
  }> {
    const saved = await this.model.updateMany(query, updateBody, {
      multi: true,
    });

    return {
      matched: saved.matchedCount,
      modified: saved.modifiedCount,
    };
  }

  async updateOne(
    query: FilterQuery<T_Model>,
    updateBody: UpdateQuery<T_Model>,
    option?: any
  ): Promise<{
    matched: number;
    modified: number;
  }> {
    const saved = await this.model.updateOne(query, updateBody, option);
    console.log(saved);
    return {
      matched: saved.matchedCount,
      modified: saved.modifiedCount,
    };
  }


  async findByIdAndUpdate(
    id: string,
    updateBody: UpdateQuery<T_Model>,
    options: QueryOptions<T_Model> | null = { new: true, useFindAndModify: false }
  ): Promise<T_Entity | null> {
    const saved = await this.model.findByIdAndUpdate(id, updateBody, options);
    console.log(saved);
    if (!saved) return null;
    return this.mapEntity(saved.toObject());;
  }

  async upsertMany(data: (FilterQuery<T_Model>)[]) {
    const promises = data.map((entry) => this.model.findOneAndUpdate(entry, entry, { upsert: true }));

    return await Promise.all(promises);
  }

  async bulkWrite(bulkOperations: any, ordered = false): Promise<any> {
    return await this.model.bulkWrite(bulkOperations, { ordered });
  }

  protected mapEntity<TData>(data: TData): TData extends null ? null : T_Entity {
    return plainToInstance(this.entity, JSON.parse(JSON.stringify(data))) as any;
  }

  protected mapEntities(data: any): T_Entity[] {
    return plainToInstance<T_Entity, T_Entity[]>(this.entity, JSON.parse(JSON.stringify(data)));
  }

  protected mapTargetEntities<T_TargetEntity>(cls: new () => T_TargetEntity, data: any): T_TargetEntity[] {
    return plainToInstance<T_TargetEntity, T_TargetEntity[]>(cls, JSON.parse(JSON.stringify(data)));
  }
}