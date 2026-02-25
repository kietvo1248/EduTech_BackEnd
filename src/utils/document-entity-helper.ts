import { Transform } from 'class-transformer';
import { TransformFnParams } from 'class-transformer/types/interfaces';
import { Types } from 'mongoose';

export class EntityDocumentHelper {
  @Transform(
    (value: TransformFnParams) => {
      if ('value' in value) {
        // https://github.com/typestack/class-transformer/issues/879
        const objValue = (value.obj as Record<string, unknown>)[value.key];
        if (objValue === null || objValue === undefined) {
          return 'unknown value';
        }
        // Handle MongoDB ObjectId
        if (objValue instanceof Types.ObjectId) {
          return objValue.toHexString();
        }
        // Handle objects with explicit _id field
        if (typeof objValue === 'object' && '_id' in objValue) {
          const idValue = (objValue as Record<string, unknown>)['_id'];
          if (idValue instanceof Types.ObjectId) {
            return idValue.toHexString();
          }
          if (typeof idValue === 'string' || typeof idValue === 'number') {
            return String(idValue);
          }
        }
        // Only convert primitives to string
        if (
          typeof objValue === 'string' ||
          typeof objValue === 'number' ||
          typeof objValue === 'boolean'
        ) {
          return String(objValue);
        }
        return 'unknown value';
      }

      return 'unknown value';
    },
    {
      toPlainOnly: true,
    },
  )
  public _id: string;
}
