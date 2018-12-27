import { ResourceMeta } from './resource-meta.interface';

export interface Resource {
  label: string;
  item: any;
  schema: Array<any>;
  meta: ResourceMeta;
}
