import { ResourceMeta } from './resource-meta.interface';

export interface ResourceList {
  label: string;
  items: Array<any>;
  schema: Array<any>;
  meta: ResourceMeta;
}
