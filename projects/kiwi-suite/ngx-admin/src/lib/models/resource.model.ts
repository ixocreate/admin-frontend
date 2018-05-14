export interface Media {
    basePath: string;
    id: string;
    description: string;
    filename: string;
    mimeType: string;
    title: string;
    type: string;
    url: string;
}

export interface User {
    avatar?: string;
    createdAt: string;
    email: string;
    id: string;
    lastLoginAt: string;
    permissions: string[];
    role: string;
    status: string;
}

/**
 * TODO: remove those below after refactoring to formly
 */
export interface ResourceModelSchema {
    label: string; // 'Resource';
    labelPlural?: string; // 'Resources'
    name: string; // 'resource';
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
    schema?: string; // reference to another schema instead of specifying it directly
    sort?: any[];
}
