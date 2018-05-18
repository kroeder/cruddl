import { ValidationMessage } from '../validation';
import { PermissionProfileConfigMap } from '../../authorization/permission-profile';
import { TypeConfig } from './type';

export interface ModelConfig {
    readonly types: ReadonlyArray<TypeConfig>
    readonly permissionProfiles?: PermissionProfileConfigMap
    readonly validationMessages?: ReadonlyArray<ValidationMessage>
}
