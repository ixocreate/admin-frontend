import { ResourceMeta } from './resource-meta.interface';

export interface Resource {
  label: string;
  item: any;
  schema: any[];
  meta: ResourceMeta;
}
