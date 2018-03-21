export interface User {
    id: string;
    email: string;
    role: string;
    status: string;
    createdAt: string;
    lastLoginAt: string;
    avatar?: string;
    permissions: string[];
}

export interface ResourceModelSchema {
    name: string; // 'resource';
    label: string; // 'Resource';
    labelPlural?: string; // 'Resources'
    controls?: ResourceModelControl[];
}

export interface ResourceModelControl {
    controls?: ResourceModelControl[];
    controlType?: string; // default text - checkbox, radio, file, image, textarea
    dataType?: string; // default string - boolean, number, text,
    defaultValue?: number | string;
    label?: string;
    multiple?: boolean; // default false
    name: string;
    schema?: ResourceModelSchema|string; // can be either a nested schema or the key for another schema listed
    options?: ResourceModelRelation[];
    repeatable?: boolean; // default false
    repeatMin?: number; // default 0
    repeatMax?: number;
    validators?: any[];
}

export interface ResourceModelRelation extends ResourceModelSchema {
    async?: { index?: string, create?: string }; // needed to display options
    createNew?: boolean; // default false
    filter?: any[];
    sort?: any[];
    schema?: string; // reference to another schema instead of specifying it directly
}
