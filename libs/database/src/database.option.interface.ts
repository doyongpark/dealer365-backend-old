export interface DatabaseModuleOptions {
  type: string;
  connectionString: string;
  useLogging?: boolean;
  entities?: any[];
  models?: any[];
}