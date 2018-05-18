import { TypeBase } from './type-base';
import { ScalarTypeConfig, TypeKind } from '../input';

export class ScalarType extends TypeBase {
    constructor(input: Exclude<ScalarTypeConfig, 'typeKind'>) {
        super(input);
    }

    readonly isObjectType: false = false;
    readonly kind: TypeKind.SCALAR = TypeKind.SCALAR;
    readonly isChildEntityType: false = false;
    readonly isRootEntityType: false = false;
    readonly isEntityExtensionType: false = false;
    readonly isValueObjectType: false = false;
    readonly isScalarType: true = true;
    readonly isEnumType: false = false;
}
