import { ResourceMeta } from './resource-meta.interface';

export interface ResourceList {
  label: string;
  items: any[];
  schema: any[];
  meta: ResourceMeta;
}
