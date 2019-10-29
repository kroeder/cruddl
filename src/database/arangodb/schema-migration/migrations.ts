import { ArangoSearchViewPropertiesOptions } from 'arangojs/lib/cjs/view';
import { BillingEntityType, Relation, RootEntityType } from '../../../model/implementation';
import { describeIndex, getIndexDescriptor, IndexDefinition } from './index-helpers';

export type SchemaMigration = CreateIndexMigration | DropIndexMigration | CreateDocumentCollectionMigration
    | CreateEdgeCollectionMigration | CreateArangoSearchViewMigration | DropArangoSearchViewMigration
    | UpdateArangoSearchViewMigration | RecreateArangoSearchViewMigration;

interface CreateIndexMigrationConfig {
    readonly index: IndexDefinition
    readonly collectionSize?: number
}

export class CreateIndexMigration {
    readonly type: 'createIndex' = 'createIndex';
    readonly index: IndexDefinition;
    readonly collectionSize: number | undefined;

    constructor(config: CreateIndexMigrationConfig) {
        this.index = config.index;
        this.collectionSize = config.collectionSize;
    }

    get description() {
        return `create ${describeIndex(this.index)}`;
    }

    get id() {
        return `createIndex/${getIndexDescriptor(this.index)}`;
    }

    get isMandatory() {
        return false;
    }
}

interface DropIndexMigrationConfig {
    readonly index: IndexDefinition
    readonly collectionSize?: number
}

export class DropIndexMigration {
    readonly type: 'dropIndex' = 'dropIndex';
    readonly index: IndexDefinition;
    readonly collectionSize: number | undefined;

    constructor(config: DropIndexMigrationConfig) {
        this.index = config.index;
        this.collectionSize = config.collectionSize;
    }

    get description() {
        return `drop ${describeIndex(this.index)}`;
    }

    get id() {
        return `dropIndex/${getIndexDescriptor(this.index)}`;
    }

    get isMandatory() {
        return false;
    }
}

export class CreateDocumentCollectionMigration {
    readonly type: 'createDocumentCollection' = 'createDocumentCollection';

    constructor(public readonly collectionName: string) {
    }

    get description() {
        return `create document collection ${this.collectionName}`;
    }

    get id() {
        return `createDocumentCollection/collection:${this.collectionName}`;
    }

    get isMandatory() {
        return true;
    }
}

export class CreateEdgeCollectionMigration {
    readonly type: 'createEdgeCollection' = 'createEdgeCollection';

    constructor(public readonly relation: Relation, public readonly collectionName: string) {
    }

    get description() {
        return `create edge collection ${this.collectionName}`;
    }

    get id() {
        return `createEdgeCollection/collection:${this.collectionName}`;
    }

    get isMandatory() {
        return true;
    }
}

interface CreateArangoSearchViewMigrationConfig {

    readonly viewName: string
    readonly properties: ArangoSearchViewPropertiesOptions
    readonly collectionName: string
    readonly collectionSize?: number
}

interface UpdateArangoSearchViewMigrationConfig extends CreateArangoSearchViewMigrationConfig {

}

interface DropArangoSearchViewMigrationConfig {
    readonly viewName: string
}

export class DropArangoSearchViewMigration {
    readonly type: 'dropArangoSearchView' = 'dropArangoSearchView';
    readonly config: DropArangoSearchViewMigrationConfig;

    constructor(config: DropArangoSearchViewMigrationConfig) {
        this.config = config;
    }

    get description() {
        return `Drop the ArangoSearchView ${this.viewName}`;
    }

    get id() {
        return `dropArangoSearch/${this.viewName}`;
    }

    get viewName() {
        return this.config.viewName;
    }

    get isMandatory() {
        return false;
    }
}

export class UpdateArangoSearchViewMigration {
    readonly type: 'updateArangoSearchView' = 'updateArangoSearchView';
    readonly viewName: string;
    readonly properties: ArangoSearchViewPropertiesOptions;
    readonly collectionName: string;
    readonly collectionSize?: number;

    constructor(config: UpdateArangoSearchViewMigrationConfig) {
        this.viewName = config.viewName;
        this.properties = config.properties;
        this.collectionName = config.collectionName;
        this.collectionSize = config.collectionSize;
    }

    get description() {
        return `Update the ArangoSearchView ${this.viewName} for the collection ${this.collectionName}`;
    }

    get id() {
        return `update ArangoSearch/${this.viewName}`;
    }

    get isMandatory() {
        return false;
    }
}

export class CreateArangoSearchViewMigration {
    readonly type: 'createArangoSearchView' = 'createArangoSearchView';
    readonly viewName: string;
    readonly properties: ArangoSearchViewPropertiesOptions;
    readonly collectionName: string;
    readonly collectionSize?: number;

    constructor(config: CreateArangoSearchViewMigrationConfig) {
        this.viewName = config.viewName;
        this.properties = config.properties;
        this.collectionName = config.collectionName;
        this.collectionSize = config.collectionSize;
    }

    get description() {
        return `Create the ArangoSearchView ${this.viewName} for the collection ${this.collectionName}`;
    }

    get id() {
        return `createArangoSearch/${this.viewName}`;
    }

    get isMandatory() {
        return false;
    }
}

export class RecreateArangoSearchViewMigration {
    readonly type: 'recreateArangoSearchView' = 'recreateArangoSearchView';
    readonly viewName: string;
    readonly properties: ArangoSearchViewPropertiesOptions;
    readonly collectionName: string;
    readonly collectionSize?: number;

    constructor(config: CreateArangoSearchViewMigrationConfig) {
        this.viewName = config.viewName;
        this.properties = config.properties;
        this.collectionName = config.collectionName;
        this.collectionSize = config.collectionSize;
    }

    get description() {
        return `Recreate the ArangoSearchView ${this.viewName} for the collection ${this.collectionName}`;
    }

    get id() {
        return `recreateArangoSearch/${this.viewName}`;
    }

    get isMandatory() {
        return false;
    }
}
