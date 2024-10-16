export abstract class ILeadService {
  abstract search(filter?: any): Promise<any>;
}