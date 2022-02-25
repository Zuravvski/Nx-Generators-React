export interface Schema {
    name: string;
    scope: string;
    type: LibraryTypes;
    redux: boolean;
}

export type LibraryTypes = 'feature' | 'data-access' | 'ui' | 'util';
