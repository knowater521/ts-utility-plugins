import { isPlainObject } from "../../object/isPlainObject";
import { isStrictArray } from "../../array/isStrictArray";
import { isBasicValue } from "../isBasicValue";

/**
 * 深拷贝
 * @param origin 源对象
 */
export function deepClone<T extends object>(origin: T): Partial<T> {
  const target = {};

  function _aidedDeepClone(origin: any, target: any): object {
    for (const key in origin) {
      const value = origin[key];

      // ? plain object
      if (isPlainObject(value)) {
        target[key] = {};
        _aidedDeepClone(value, target[key]);
      }
      // ? array
      else if (isStrictArray(value)) {
        target[key] = [];
        for (let i = 0; i < value.length; i++) {
          // ? array that contains a plain object
          if (isPlainObject(value[i])) {
            target[key][i] = {};
            _aidedDeepClone(value[i], target[key][i]);
          }
          // TODO: ignore the array that contains more that one nest
          // ? array that contains the basic value;
          else {
            target[key][i] = value[i];
          }
        }
      }
      // ? basic value
      else if (isBasicValue(value)) {
        target[key] = value;
      }

      // TODO: function...
    }

    return target;
  }

  return _aidedDeepClone(origin, target);
}