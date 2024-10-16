export abstract class ILeadRepository {
  abstract search(filter?: any): Promise<any>;
}