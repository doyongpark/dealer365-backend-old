export interface DatabaseModuleOptions {
  type: string;
  connectionString: string;
  entities?: any[];
  models?: any[];
}